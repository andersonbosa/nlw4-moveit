import Image from 'next/image'
import Img from '@/assets/logo.svg'

export default function ImgLogo () {
  return (
    <>
      <Image src={Img} alt="image" />
    </>
  )
}