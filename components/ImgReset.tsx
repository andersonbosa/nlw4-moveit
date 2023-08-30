import Image from 'next/image'
import Img from '@/assets/reset.svg'

export default function ImgReset () {
  return (
    <>
      <Image src={Img} alt="image" width={32}/>
    </>
  )
}