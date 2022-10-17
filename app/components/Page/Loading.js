import React from 'react'
import styled from 'styled-components'
import Lottie from 'components/Control/Lottie'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'

export default ({ text, size, isOverlay }) => {
    return <Wrapper isOverlay={isOverlay} style={{ flex: 1 }}>
        <View size={size}><Lottie name="loader" /></View>
        { text && <LoadingText>{text}</LoadingText> }
    </Wrapper>
}

const Wrapper = ({isOverlay, children}) => isOverlay ?
    <OverlayContainer>{children}</OverlayContainer> :
    <Container>{children}</Container>

const View = styled.View`
    width: ${p => p.size || 100}px;
    height: ${p => p.size || 100}px;
`

const OverlayContainer = styled.View`
    background: rgba(0, 0, 0, 0.6);
    flex: 1;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
    justify-content: center;
    align-items: center;
    elevation: ${Styles.ELEVATION};
`

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left: 0;
`

const LoadingText = styled.Text`
    color: ${Colors.LOADING_BLUE};
    margin-top: 10px;
`
