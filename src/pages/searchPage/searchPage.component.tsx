import * as React from "react";
import { PageBarComponent } from "./components/pageBar";
import { DrawerComponent } from "./components/drawer";
import { SearchComponent } from "./components/search";
import { ItemViewComponent } from "./components/item";
import { FacetViewComponent } from "./components/facets";
import {
  ItemCollection,
  FacetCollection,
  FilterCollection,
  Filter,
  SuggestionCollection,
} from "./viewModel";
import { Service } from "./serviceModel";

const style = require("./searchPage.style.scss");

interface Props {
  activeService: Service;
  drawerShow: boolean;
  searchValue: string;
  itemCollection: ItemCollection;
  facetCollection: FacetCollection;
  filterCollection: FilterCollection;
  suggestionCollection?: SuggestionCollection;
  onSearchSubmit: () => void;
  onSearchUpdate: (value: string) => void;
  onFilterUpdate: (newFilter: Filter) => void;
  onDrawerClose: () => void;
  onMenuClick: () => void;
}

class SearchPageComponent extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={style.pageContainer}>
        <DrawerComponent
          className={style.drawerContainer}
          activeService={this.props.activeService}
          show={this.props.drawerShow}
          onClose={this.props.onDrawerClose}
        >
          <SearchComponent
            value={this.props.searchValue}
            onSearchSubmit={this.props.onSearchSubmit}
            onSearchUpdate={this.props.onSearchUpdate}
            suggestionCollection={this.props.suggestionCollection}
          />
          <FacetViewComponent
            facets={this.props.facetCollection}
            filters={this.props.filterCollection}
            onFilterUpdate={this.props.onFilterUpdate}
          />
        </DrawerComponent>
        <main className={style.mainContainer}>
          <PageBarComponent value={this.props.searchValue} onMenuClick={this.props.onMenuClick} />
          <ItemViewComponent items={this.props.itemCollection} />
        </main>
      </div>
    );
  }
}

export { SearchPageComponent };
