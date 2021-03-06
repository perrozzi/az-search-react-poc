import * as React from "react";
import Hidden from "material-ui/Hidden";
import Drawer from "material-ui/Drawer";
import { DrawerBarComponent } from "./drawerBar.component";
import { cnc } from "../../../../util";
import { Service } from "../../serviceModel";

const style = require("./drawer.style.scss");


interface Drawer {
  activeService: Service;
  show: boolean;
  onClose: () => void;
  className?: string;
}

const DrawerForMobileComponent: React.StatelessComponent<Drawer> = (props) => {
  return (
    <Hidden mdUp>
      <Drawer classes={{ paper: style.drawerPaperMobile }}
        variant="temporary"
        anchor="left"
        open={props.show}
        onClose={props.onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerBarComponent onClose={props.onClose} activeService={props.activeService} />
        {props.children}
      </Drawer>
    </Hidden>
  );
};

const DrawerForDesktopComponent: React.StatelessComponent<Drawer> = (props) => {
  return (
    <Hidden smDown>
      <Drawer classes={{ 
          docked: props.show ? style.drawerDock : style.drawerDockHidden,
          paper: style.drawerPaperDesktop,
        }}
        variant="persistent"
        anchor="left"
        open={props.show}
        onClose={props.onClose}
        elevation={8}
      >
        <DrawerBarComponent onClose={props.onClose} activeService={props.activeService} />
        {props.children}
      </Drawer>
    </Hidden>
  );
};

const DrawerComponent: React.StatelessComponent<Drawer> = (props) => {
  return (
    <div className={cnc(props.show && style.raise, props.className)}>
      <DrawerForMobileComponent 
        show={props.show}
        onClose={props.onClose}
        activeService={props.activeService}
      >
        {props.children}
      </DrawerForMobileComponent>
      <DrawerForDesktopComponent
        show={props.show}
        onClose={props.onClose}
        activeService={props.activeService
      }>
        {props.children}
      </DrawerForDesktopComponent>
    </div>
  );
};

export { DrawerComponent };
