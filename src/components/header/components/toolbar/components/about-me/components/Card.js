// @flow

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialMediaActions from '../../../../../../../store/ducks/social';

const CloseButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 12px 12px 0;
`;

const SocialContactContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 12px 24px;
`;

const SocialContactIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -12px;
  padding-bottom: 2px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 18px;
`;

const AboutMeText = styled.p`
  margin-top: 12px;
  font-size: 15px;
`;

const SocialIDText = styled.p`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
`;

const SOCIAL_MEDIA_TYPES = {
  LINKEDIN: 'LINKEDIN',
  GITHUB: 'GITHUB',
};

const STYLES = {
  [SOCIAL_MEDIA_TYPES.GITHUB]: {
    iconURL: 'https://s3-sa-east-1.amazonaws.com/store-system-resources/github.svg',
    url: 'https://github.com/steniowagner',
    backgroundColor: '#333',
    socialId: '/steniowagner',
    alt: 'Github Icon',
    iconHeight: 22,
    iconWidth: 22,
  },

  [SOCIAL_MEDIA_TYPES.LINKEDIN]: {
    iconURL: 'https://s3-sa-east-1.amazonaws.com/store-system-resources/linkedin.svg',
    url: 'https://www.linkedin.com/in/steniowagner/',
    backgroundColor: '#0077b5',
    socialId: '/steniowagner',
    alt: 'Linkedin Icon',
    iconHeight: 19,
    iconWidth: 19,
  },
};

const styles = {
  card: {
    width: 300,
  },
  media: {
    objectFit: 'cover',
  },
};

type Props = {
  onToggleCardDialog: Function,
  openURL: Function,
  classes: Object,
};

const renderSocialContainerItem = (openURL: Function, type: string): Object => {
  const {
    backgroundColor,
    iconHeight,
    iconWidth,
    socialId,
    iconURL,
    alt,
    url,
  } = STYLES[type];

  return (
    <SocialContactContainer>
      <Button
        onClick={() => openURL(url)}
      >
        <SocialContactIconWrapper
          backgroundColor={backgroundColor}
        >
          <img
            height={iconHeight}
            width={iconWidth}
            src={iconURL}
            alt={alt}
          />
        </SocialContactIconWrapper>
        <SocialIDText>
          {socialId}
        </SocialIDText>
      </Button>
    </SocialContactContainer>
  );
};

const AboutMeCard = ({ onToggleCardDialog, openURL, classes }: Props) => (
  <Card
    className={classes.card}
  >
    <CardMedia
      image="https://s3-sa-east-1.amazonaws.com/store-system-resources/stenio.jpg"
      className={classes.media}
      alt="Stenio Wagner"
      component="img"
      height="150"
    />
    <CardContent>
      <h3>
        Hey!
      </h3>
      <AboutMeText>
        I'm Stenio, a Full Stack Engineer with interests in JavaScript world, including NodeJS and, obviously, the React Ecossystem (ReactJS, React-Native, Redux, Redux-Saga and GraphQL).
      </AboutMeText>
    </CardContent>
    {renderSocialContainerItem(openURL, SOCIAL_MEDIA_TYPES.GITHUB)}
    {renderSocialContainerItem(openURL, SOCIAL_MEDIA_TYPES.LINKEDIN)}
    <CloseButtonWrapper>
      <Button
        onClick={onToggleCardDialog}
        color="primary"
        size="small"
      >
        Close
      </Button>
    </CloseButtonWrapper>
  </Card>
);

const mapDispatchToProps = dispatch => bindActionCreators(SocialMediaActions, dispatch);

const CardComponent = connect(null, mapDispatchToProps)(AboutMeCard);

export default withStyles(styles)(CardComponent);
