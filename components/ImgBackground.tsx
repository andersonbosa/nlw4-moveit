import Image from 'next/image'
import Img from '@/assets/background-home.svg'

export default function ImgBackground () {
  return (
    <Image
      src={Img}
      alt="image"
      style={{
      }}
    />
  )
}
