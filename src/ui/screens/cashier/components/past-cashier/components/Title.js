// @flow

import React from 'react';

import styled from 'styled-components';

const TitleWrapper = styled.div`
  margin-bottom: 16px;
`;

type Props = {
  children: string,
};

const Title = ({ children }: Props): Object => {
  const textWithDateText = `Registros do dia ${children}`;
  const defaultText = 'Estes são todos os Registros';

  const textToShow = (children ? textWithDateText : defaultText);

  return (
    <TitleWrapper>
      <h1>
        {textToShow}
      </h1>
    </TitleWrapper>
  );
};

export default Title;
