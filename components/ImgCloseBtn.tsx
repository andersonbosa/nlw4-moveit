import Image from 'next/image'
import Img from '@/assets/close.svg';

export default function ImgCloseBtn () {
  return (
    <>
      <Image src={Img} alt="image" />
    </>
  )
}