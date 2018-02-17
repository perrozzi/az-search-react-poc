import * as React from "react"
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Collapse from "material-ui/transitions/Collapse";
import { Facet } from "../../viewModel";
import { Chevron } from "../../../../common/components/chevron";

const style = require("./facetItem.style.scss");

interface FacetItem {
  facet: Facet;
}

interface State {
  expanded: boolean;
}

class FacetItemComponent extends React.Component<FacetItem, State> {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  private toggleExpand = () => {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded,
    });
  }
    
  public render() {
    const { facet } = this.props;
    const { expanded } = this.state;

    if (!facet.valueSet) { return null }

    return (
      <Card classes={{root:style.item}} elevation={0}>
        <CardActions classes={{root: style.itemActions}}>
          <Typography variant="title">
            {facet.displayName}
          </Typography>
          <Chevron onClick={this.toggleExpand} expanded={expanded}/>
        </CardActions>
        <Collapse in={expanded} timeout="auto">
          <div className={style.controlContainer}>
            Facet Control Values:
            {JSON.stringify(facet.valueSet)}
          </div>          
        </Collapse>  
      </Card>
    );
  }  
}

export { FacetItemComponent };