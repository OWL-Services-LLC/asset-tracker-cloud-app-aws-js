import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { useChartDateRange } from 'hooks/useChartDateRange'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

export const AMAccelChart = ({
	data,
	type,
	className,
}: {
	data: { date: Date; x: number; y: number; z: number }[]
	type: 'line' | 'column'
	className?: string
}) => {
	const { range } = useChartDateRange()
	const containerId = useRef<string>(nanoid())

	useEffect(() => {
		const root = am5.Root.new(containerId.current)

		const container = root.container.children.push(
			am5.Container.new(root, {
				id: containerId.current,
				width: am5.percent(100),
				height: am5.percent(100),
			}),
		)

		const chart = container.children.push(am5xy.XYChart.new(root, {}))

		const dateAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				baseInterval: { timeUnit: 'second', count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {}),
				min: range.start.getTime(),
				max: range.end.getTime(),
			}),
		)

		const valueAxes = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			}),
		)

		const tooltip = am5.Tooltip.new(root, {
			labelText: '{valueY}',
		})

		const seriesArray: am5xy.XYSeries[] = []

		;['x', 'y', 'z'].forEach((axis, index) => {
			const series = chart.series.push(
				type === 'column'
					? am5xy.ColumnSeries.new(root, {
							xAxis: dateAxis,
							yAxis: valueAxes,
							valueYField: axis,
							valueXField: 'date',
							tooltip,
						})
					: am5xy.LineSeries.new(root, {
							xAxis: dateAxis,
							yAxis: valueAxes,
							valueYField: axis,
							valueXField: 'date',
							tooltip,
							stroke: am5.color(`#${getSeriesColor(index)}`),
						}),
			)

			series.data.setAll(
				data.map(({ date, x, y, z }) => ({
					date: date.getTime(),
					x,
					y,
					z,
				})),
			)

			seriesArray.push(series)
		})

		const cursorSettings: { snapToSeries?: am5xy.XYSeries[] } = {
			snapToSeries: seriesArray,
		}

		chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				...cursorSettings,
				xAxis: dateAxis,
			}),
		)

		return () => {
			root.dispose()
		}
	}, [data, type, containerId.current, range.start, range.end])

	return (
		<div
			style={{ width: '100%', height: '400px' }}
			id={containerId.current}
			className={`historical-data-chart ${className ?? ''}`}
		/>
	)
}

const getSeriesColor = (index: number): string => {
	const colors = ['FF0000', '00FF00', '0000FF']
	return colors[index % colors.length]
}
