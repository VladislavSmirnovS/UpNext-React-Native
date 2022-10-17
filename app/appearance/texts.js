import Colors from 'appearance/colors'
import styled, { css } from 'styled-components'

// base fonts
const BoldText = styled.Text`
  font-weight: bold;
`

const MediumText = styled.Text`
  font-weight: 500;
`

const RegularText = styled.Text``

// sizes

const HeaderSize = css`
  font-size: 27.7px;
  letter-spacing: -0.67px;
`

const NewHeaderSize = css`
  font-size: 24px;
  letter-spacing: -0.35px;
  line-height: 28px;
`

const BigSize = css`
  font-size: 25px;
  letter-spacing: -0.45px;
`

const SubHeaderSize = css`
  font-size: 20px;
  letter-spacing: -0.42px;
`

const TitleSize = css`
  font-size: 17px;
  letter-spacing: -0.41px;
`
const NewTitleSize = css`
  font-size: 16px;
  line-height: 22px
  letter-spacing: -0.41px;
`

const SubtitleSize = css`
  font-size: 14.7px;
  letter-spacing: -0.35px;
`
const LinkSize = css`
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.32px;
`

const ContentSize = css`
  font-size: 13.1px;
  line-height: 16.3px;
  letter-spacing: -0.32px;
`

const NumberingSize = css`
  font-size: 18.3px;
  line-height: 18.3px;
  letter-spacing: -0.44px;
`

const ButtonSize = css`
  font-size: 15.3px;
  letter-spacing: -0.37px;
`

const PodcastTitleSize = css`
  font-size: 20px;
  letter-spacing: -0.48px;
`

const PodcastSubtitleSize = css`
  font-size: 12.7px;
  line-height: 19.7px;
  letter-spacing: -0.31px;
`

const ButtonSecondarySize = css`
  font-size: 11.7px;
  line-height: 15px;
  letter-spacing: -0.28px;
`

const TutorialSize = css`
  font-size: 13.3px;
  line-height: 14.7px;
  letter-spacing: -0.32px;
`

const SmallSize = css`
  font-size: 11.7px;
  line-height: 15px;
  letter-spacing: -0.28px;
`

// fonts

const SmallText = styled(RegularText)`
    ${SmallSize}
    color: ${Colors.TEXT_DARK_BLUE};
`

const HeaderText = styled(RegularText)`
    ${HeaderSize}
    color: ${Colors.TEXT_DARK_BLUE};
`

const BigText = styled(RegularText)`
    ${BigSize}
    color: ${Colors.TEXT_DARK_BLUE};
`

const SubHeader = styled(RegularText)`
  ${SubHeaderSize}
  color: ${Colors.TEXT_DARK_BLUE};
`

const GreySubHeader = styled(RegularText)`
  ${SubHeaderSize}
  color: ${Colors.COMMON_GREY};
`

const GreyTitleText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.TEXT_GREY};
`

const BlueTitleText = styled(RegularText)`
  ${TitleSize};
  color: ${Colors.COMMON_BLUE};
`

const GreyText = styled(RegularText)`
    ${SubtitleSize}
    color: ${Colors.TEXT_GREY};
`

const BlueText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.COMMON_BLUE};
`
const NewBlueText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.TEXT_BRIGHT_BLUE};
`

const RedText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.COMMON_RED};
`
const NewRedText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.TEXT_RED};
`

const PurpleText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.COMMON_PURPLE};
`

const OrangeText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.COMMON_ORANGE};
    font-weight: 700;
`

const WhiteText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.WHITE};
    font-weight: 700;
`
const DarkPurpleText = styled(RegularText)`
  font-size: 16px;
  line-height: 18.3px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-weight: 400;
`
const BoldDarkPurpleText = styled(RegularText)`
  font-size: 16px;
  line-height: 18.3px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-weight: 600;
`

const NewWhiteText = styled(RegularText)`
    ${NewTitleSize}
    color: ${Colors.WHITE};
    font-weight: 400;
`

const TitleText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.TEXT_DARK_BLUE};
`
const LinkText = styled(RegularText)`
    ${LinkSize}
    color: ${Colors.TEXT_DARK_BLUE};
`

const ContentText = styled(RegularText)`
    ${ContentSize}
    color: ${Colors.TEXT_CONTENT};
`

const SubtitleText = styled(RegularText)`
    ${SubtitleSize}
    color: ${Colors.TEXT_DARK_PURPLE};
`

const NumberingText = styled(MediumText)`
    ${NumberingSize}
    color: ${Colors.TEXT_NUMBERING};
`

const ButtonText = styled(MediumText)`
    ${ButtonSize}
    color: ${p => p.color || Colors.WHITE};
`

const OverflowText = styled(RegularText)`
    ${TitleSize}
    color: ${Colors.WHITE};
`

const TabActiveText = styled(MediumText)`
    ${SubtitleSize}
    color: ${Colors.TEXT_TAB_ACTIVE};
`

const TabInactiveText = styled(TabActiveText)`
  color: ${Colors.TEXT_TAB_INACTIVE};
`

const PodcastTitleText = styled(MediumText)`
    ${PodcastTitleSize}
    color: ${Colors.TEXT_DARK_BLUE};
`

const PodcastSubtitleText = styled(RegularText)`
    ${PodcastSubtitleSize}
    color: ${Colors.TEXT_GREY};
`

const ButtonSecondaryText = styled(RegularText)`
    ${ButtonSecondarySize}
    color: ${Colors.TEXT_CONTENT};
`

const SuccessText = styled(RegularText)`
    ${NumberingSize}
    color: ${Colors.BUTTON_GREEN};
`

const TutorialText = styled(RegularText)`
    ${TutorialSize}
    color: ${Colors.BUTTON_DARK_BLUE};
`

const LoginTermsText = styled(RegularText)`
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  color: ${Colors.WHITE};
`

const LoginTermsHyperlinkText = styled(LoginTermsText)`
  color: ${Colors.WHITE};
`

// fonts
const BoldTitleText = styled(BoldText)`
  ${TitleSize};
  color: ${Colors.TEXT_DARK_BLUE};
`
const NewBoldTitleText = styled(BoldText)`
  ${NewHeaderSize};
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const BoldSubHeaderText = styled(BoldText)`
  ${SubHeaderSize};
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const BoldHeaderText = styled(BoldText)`
  ${HeaderSize};
  color: ${Colors.TEXT_DARK_BLUE};
`

const BoldBigText = styled(BoldText)`
  ${BigSize};
  color: ${Colors.TEXT_DARK_BLUE};
`

const BlueBoldBigText = styled(BoldText)`
  ${BigSize};
  color: ${Colors.COMMON_BLUE};
`

const BoldBlueTitleText = styled(BoldText)`
  ${TitleSize};
  color: ${Colors.COMMON_BLUE};
`

const WhiteHeaderText = styled(BoldText)`
  ${NewHeaderSize};
  color: ${Colors.WHITE};
`

const PurpleHeaderText = styled(MediumText)`
  ${NewHeaderSize};
  color: ${Colors.MENU_PURPLE};
  line-height: 18px;
`

const PurpleSubTitleText = styled(MediumText)`
  ${ContentSize};
  color: ${Colors.MENU_PURPLE};
  line-height: 15px;
`
const BoldPurpleSubTitleText = styled(MediumText)`
  ${ContentSize};
  color: ${Colors.MENU_PURPLE};
  line-height: 15px;
  font-weight: 700;
`
 const BlueSubTitleText = styled(BoldText)`
   font-size: 16px;
   color: ${Colors.TEXT_BRIGHT_BLUE};
   line-height: 18px;
 `

 const BlueHeaderText = styled(MediumText)`
   ${NewHeaderSize};
   color: ${Colors.TEXT_BRIGHT_BLUE};
   line-height: 18px;
  font-weight: 700;
 `

const WhiteSubtitleText = styled(TitleText)`
  color: ${Colors.WHITE};
`

export default {
  BoldText,
  MediumText,
  RegularText,
  BoldTitleText,
  NewBoldTitleText,
  BoldSubHeaderText,
  BoldHeaderText,
  BoldBigText,
  BlueBoldBigText,
  BoldBlueTitleText,
  WhiteHeaderText,
  WhiteSubtitleText,

  SmallText,
  HeaderText,
  BigText,
  TitleText,
  LinkText,
  ContentText,
  GreyText,
  GreyTitleText,
  GreySubHeader,
  BlueText,
  NewBlueText,
  RedText,
  NewRedText,
  WhiteText,
  NewWhiteText,
  OrangeText,
  PurpleText,
  SubtitleText,
  NumberingText,
  ButtonText,
  TabActiveText,
  TabInactiveText,
  PodcastTitleText,
  PodcastSubtitleText,
  PurpleHeaderText,
  ButtonSecondaryText,
  SuccessText,
  TutorialText,
  LoginTermsText,
  LoginTermsHyperlinkText,
  OverflowText,
  SubHeader,
  BlueHeaderText,
  DarkPurpleText,
  BoldDarkPurpleText,
  BlueTitleText,
  PurpleSubTitleText,
  BoldPurpleSubTitleText,
  BlueSubTitleText,

  sizes: {
    HeaderSize,
    NewHeaderSize,
    NewTitleSize,
    TitleSize,
    SubtitleSize,
    ContentSize,
  },
}
