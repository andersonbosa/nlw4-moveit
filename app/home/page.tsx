import HomePageComp from '@/components/HomePageComp'
import { cookies } from 'next/headers'


export const getChallengeProps = async () => {
  const cookiesList = cookies()

  const level = await cookiesList.get('level')
  const currentExperience = await cookiesList.get('currentExperience')
  const challengesCompleted = await cookiesList.get('challengesCompleted')
  const challengesFinished = await cookiesList.get('challengesFinished')

  const props = {
    level: Number(level?.value),
    currentExperience: Number(currentExperience?.value),
    challengesCompleted: Number(challengesCompleted?.value),
    challengesFinished: challengesFinished?.value ? JSON.parse(challengesFinished?.value) : []
  }

  return props
}

export default async function HomePage () {
  const challProps = await getChallengeProps()

  return (
    <>
      <HomePageComp props={challProps} />
    </>
  )
}
