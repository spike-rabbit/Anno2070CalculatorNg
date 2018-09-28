import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly rawMaterialPattern = /^RawMaterial(\d+)$/;

  private readonly rawNeededPattern = /^RawNeeded(\d+)$/;

  private _buildingData: Observable<ProductionBuilding[]>;

  constructor(private http: HttpClient) {
    this._buildingData = this.loadBuildingData();
  }

  get buildingData() {
    return this._buildingData;
  }

  private loadBuildingData() {
    return this.http.get(`assets/base.xml`, { responseType: 'text' }).pipe(
      map(result => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(result, 'text/xml');


        const productionBuildingNodes = parsed.evaluate('//WareProduction/Product/../..',
          parsed, null, XPathResult.ANY_TYPE, null);


        let productionBuildingNode = productionBuildingNodes.iterateNext();

        const buildingDatas: ProductionBuilding[] = [];
        while (productionBuildingNode) {

          // Standard { Name, GUID}
          // WareProduction { Product, ProductionTime }
          // Factory { RawMaterial*, RawNeeded* }
          // BuildCost { NeedsIntermediatelevel }
          // Building { BuildingLevel }

          const buildingData: ProductionBuilding = { rawMaterial: [] } as any;

          productionBuildingNode.childNodes.forEach(cn => {
            switch (cn.nodeName) {
              case 'Standard':
                cn.childNodes.forEach(sn => {
                  switch (sn.nodeName) {
                    case 'Name':
                      buildingData.name = sn.textContent;
                      break;
                    case 'GUID':
                      buildingData.guid = +sn.textContent;
                      break;
                    default:
                      break;
                  }
                });
                break;
              case 'WareProduction':
                cn.childNodes.forEach(wn => {
                  switch (wn.nodeName) {
                    case 'Product':
                      buildingData.product = wn.textContent;
                      break;
                    case 'ProductionTime':
                      buildingData.productTime = +wn.textContent;
                  }
                });
                break;
              case 'BuildCost':
                cn.childNodes.forEach(bn => {
                  if (bn.nodeName === 'NeedsIntermediatelevel') {
                    buildingData.intermediateLevel = bn.textContent;
                  }
                });
                break;
              case 'Factory':
                cn.childNodes.forEach(fn => {
                  const rmResult = this.rawMaterialPattern.exec(fn.nodeName);
                  if (rmResult) {
                    buildingData.rawMaterial[+rmResult[1] - 1] = { product: fn.textContent };
                  } else {
                    const rnResult = this.rawNeededPattern.exec(fn.nodeName);
                    if (rnResult) {
                      buildingData.rawMaterial[+rnResult[1] - 1].amount = +fn.textContent;
                    }
                  }
                });
                break;
              case 'Building':
                cn.childNodes.forEach(bn => {
                  if (bn.nodeName === 'BuildingLevel') {
                    buildingData.buildingLevel = bn.textContent;
                  }
                });
                break;
              default:
                break;
            }
          });

          buildingDatas.push(buildingData);
          productionBuildingNode = productionBuildingNodes.iterateNext();
        }


        const resourceToBuildingMap: Map<string, ProductionBuilding[]> = new Map();

        buildingDatas.forEach(bd => {
          const mapData = resourceToBuildingMap.get(bd.product);
          if (mapData) {
            mapData.push(bd);
          } else {
            resourceToBuildingMap.set(bd.product, [bd]);
          }
        });


        buildingDatas.filter(bd => bd.rawMaterial.length > 0).flatMap(bd => bd.rawMaterial).forEach(rm => {
          rm.productionBuildings = resourceToBuildingMap.get(rm.product);
        });

        console.log('loaded');
        return buildingDatas;

      }), share());
  }

}

export interface ProductionBuilding {
  name: string;
  guid: number;
  product: string;
  productTime: number;
  rawMaterial: ProductionBuildingInput[];
  intermediateLevel: string;
  buildingLevel: string;
}

export interface ProductionBuildingInput {
  product: string;
  amount?: number;
  productionBuildings?: ProductionBuilding[];
}
