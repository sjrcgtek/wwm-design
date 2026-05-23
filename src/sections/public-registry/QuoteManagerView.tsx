import data from '@/../product/sections/public-registry/data.json'
import { QuoteManager } from './components/QuoteManager'

export default function QuoteManagerView() {
  return (
    <QuoteManager
      quotes={data.quotes}
      onAddQuote={(text, attribution) => console.log('Add quote:', { text, attribution })}
      onUpdateQuote={(id, text, attribution) => console.log('Update quote:', id, { text, attribution })}
      onDeleteQuote={(id) => console.log('Delete quote:', id)}
    />
  )
}
