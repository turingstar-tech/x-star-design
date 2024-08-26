export interface ImgShowProps {
  /**
   * @description 缩放比例
   */
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface TitleShowProps {
  offsetX?: number;
  offsetY?: number;
  fontSize?: number;
  fontFamily?: string;
  shadowColor?: string;
  color?: string;
}

export interface AcAnimationProps {
  /**
   * @description 文本内容
   */
  title?: string;
  /**
   * @description 图片地址
   */
  imgUrl?: string;
  /**
   * @default scale: 1, offsetX: 0, offsetY: 0 相对canvas水平垂直居中
   */
  imgSizeAndPosition?: ImgShowProps;
  /**
   * @default offsetX: 0, offsetY: 0, fontSize: 36, fontFamily: 'Arial', shadowColor: 'rgba(2,38,121,0.2)', color: '#022679' 相对canvas水平垂直居中
   */
  titleStyle?: titleShowProps;
  /**
   * @description canvas卸载时的回调
   */
  onFinish?: () => void;
}
