import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const RowItem = styled.div`
  width: 48%;
  margin-left: 12px,
  margin-right: 18px,
`;

export const Section = styled.div`
  width: 100%
  margin-top: 32px;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.span`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 24px;
  font-weight: 500;
`;

export const SectionTitleWrapper = styled.div`
  margin-bottom: 24px;
`;
