import { ChartDateRange } from 'components/ChartDateRange/ChartDateRange'
import { AMAccelChart } from 'components/HistoricalData/AMAccelChart'
import { NoData } from 'components/NoData'

export const AssetAccelerationHistoryChart = ({
	history,
	className,
	type,
	hideBinControls,
}: {
	history: {
		date: Date
		x: number
		y: number
		z: number
	}[]
	className?: string
	type?: 'line' | 'column'
	hideBinControls?: boolean
}) => (
	<>
		<ChartDateRange
			className="mb-4"
			hideBinControls={hideBinControls ?? false}
		/>
		{history.length === 0 ? (
			<NoData />
		) : (
			<AMAccelChart
				data={history}
				type={type ?? 'line'}
				className={className}
			/>
		)}
	</>
)
