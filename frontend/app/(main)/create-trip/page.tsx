import { getUserInterests } from '@/app/lib/api/interests'
import CreateTripForm from '../../ui/components/create-trip/form'
import NoInterestsScreen from '@/app/ui/components/create-trip/noInterests'

export default async function Createtrip() {
  const userInterests = await getUserInterests()
  return (
    <div>
      {!userInterests && <NoInterestsScreen />}
      {userInterests && <CreateTripForm />}
    </div>
  )
}
