import Image from 'next/image'
import Img from '@/assets/logo-brand.svg'

export default function ImgLogoFull () {
  return (
    <>
      <Image src={Img} alt="image" width={360}/>
    </>
  )
}