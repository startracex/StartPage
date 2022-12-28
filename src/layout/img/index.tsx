import React from "react";
import {read } from "../../func/storage";
export default class Img extends React.Component<any, any> {
   constructor(props: any) {
      super(props);
      this.state ={
         mobile: this.isM(window.innerHeight, window.innerWidth)
      }

   }
   isM = (h: number, w: number): boolean => {
      return (w / h) < 0.66
   }
   componentDidMount() {
      window.addEventListener('resize', this.handleResize)
   }
   componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
   }
   handleResize = () => {
      this.setState({
         mobile: this.isM(window.innerHeight, window.innerWidth)
      }
      )
   }
   // 获取本地图片，没有返回undefined
   getLocal = (): string | undefined => {
      return read('LBI') || undefined
   }
   src = (): string | undefined => {
      // 启用必应图片
      if (this.props.bing) {
         return this.state.mobile ? "https://bing.img.run/m.php" : "https://bing.img.run/uhd.php"
      }
      // 启用本地图片，或是undefined
      else {
         return this.getLocal()
      }
   }
   render(): React.ReactNode {
      return <img
         src={this.src()}
      ></img>
   }
}