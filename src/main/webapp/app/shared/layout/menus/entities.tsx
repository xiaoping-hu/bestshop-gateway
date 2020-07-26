import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/product">
      <Translate contentKey="global.menu.entities.productProduct" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/product-bundle">
      <Translate contentKey="global.menu.entities.productProductBundle" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/product-bundle-item">
      <Translate contentKey="global.menu.entities.productProductBundleItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cart-discount-rule">
      <Translate contentKey="global.menu.entities.cartCartDiscountRule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cart-discount-rule-item">
      <Translate contentKey="global.menu.entities.cartCartDiscountRuleItem" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
