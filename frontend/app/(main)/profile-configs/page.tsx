import { getUserData } from '@/app/lib/api/userInfo'
import { Profile } from '@/app/lib/interfaces/Schemas'
import ConfigAccClient from '@/app/ui/components/profile-configs/ConfigAccClient'

// this is configured this way so the server can request for the data and pass it to the client
// component who manages the rendering component logic
export default async function ConfigAccServer() {
  const userData: Profile = await getUserData()

  return (
    <>
      <ConfigAccClient userData={userData} />
    </>
  )
}
