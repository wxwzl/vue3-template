import { getStyle, setStyle } from "./domUtil";
function getHtmlFontSize() {
  const docEle = document.documentElement;
  let fontSizeStr = getStyle(docEle, "font-size");
  if (fontSizeStr) {
    fontSizeStr = fontSizeStr.substr(0, fontSizeStr.length - 2);
    return Number(fontSizeStr);
  }
  return null;
}
const DesignfontSize = getHtmlFontSize();
export function adpatorScreenRatio(screenRatioByDesign: number = 1920 / 1080) {
  const docEle = document.documentElement;
  function setHtmlFontSize() {
    const screenRatio = docEle.clientWidth / docEle.clientHeight;
    let ratio = screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1;
    if (ratio < 0.5) {
      ratio = 0.5;
    }
    if (DesignfontSize) {
      // console.log("DesignfontSize:",DesignfontSize,"变化后:", DesignfontSize * ratio);
      setStyle(docEle, "fontSize", DesignfontSize * ratio + "px");
    }
  }
  setHtmlFontSize();
  window.addEventListener("resize", setHtmlFontSize);
}

export function adpatorScreenWidth(screenWidthByDesign = 1920) {
  const docEle = document.documentElement;
  function setHtmlFontSize() {
    const screenWidth = docEle.clientWidth;
    let ratio = screenWidth / screenWidthByDesign;
    if (ratio < 0.8) {
      ratio = 0.8;
    }
    if (DesignfontSize) {
      setStyle(docEle, "fontSize", DesignfontSize * ratio + "px");
    }
  }
  setHtmlFontSize();
  window.addEventListener("resize", setHtmlFontSize);
}

export function adpatorScreenAuto(screenWidthByDesign = 1920, screenHeightByDesign = 1080) {
  const docEle = document.documentElement;
  function setHtmlFontSize() {
    const screenWidth = docEle.clientWidth;
    const screenHeigtht = docEle.clientHeight;
    const widthRatio = screenWidth / screenWidthByDesign;
    const heightRatio = screenHeigtht / screenHeightByDesign;
    let ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    if (ratio < 0.5) {
      ratio = 0.5;
    }
    if (DesignfontSize) {
      // console.log(DesignfontSize * ratio);
      setStyle(docEle, "fontSize", DesignfontSize * ratio + "px");
    }
  }
  setHtmlFontSize();
  window.addEventListener("resize", setHtmlFontSize);
}
