import data from '@/../product/sections/public-registry/data.json'
import { PublicRegistry } from './components/PublicRegistry'

export default function PublicRegistryView() {
  return (
    <PublicRegistry
      registry={data.registry}
      categories={data.categories}
      items={data.items}
      onClaimItem={(itemId, donor) => console.log('Claim item:', itemId, donor)}
    />
  )
}
