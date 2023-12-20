import { AssetAccelerationHistoryChart } from 'components/HistoricalData/AssetAccelerationHistoryChart'
import { useAssetAccelerationHistory } from 'hooks/useAssetAccelerationHistory'

export const AccelerationChart = () => (
	<AssetAccelerationHistoryChart
		history={useAssetAccelerationHistory()}
		className={'acceleration-history'}
	/>
)
