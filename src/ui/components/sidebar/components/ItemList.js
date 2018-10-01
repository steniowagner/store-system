// @flow

import React, { Fragment } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import styled from 'styled-components';

const CustomListItem = styled(ListItem).attrs({
  selected: ({ active }) => active,
  button: true,
})`
  height: 60px;
`;

type Props = {
  onClickItem: Function,
  active: boolean,
  title: string,
  index: number,
  icon: Object,
};

const ItemList = ({
  onClickItem,
  active,
  title,
  index,
  icon,
}: Props): Object => {
  const Icon = icon;

  return (
    <CustomListItem
      onClick={() => onClickItem(index)}
      active={active}
    >
      <Fragment>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={title}
        />
      </Fragment>
    </CustomListItem>
  );
};

export default ItemList;
