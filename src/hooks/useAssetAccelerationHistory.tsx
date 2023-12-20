import { SensorProperties } from 'asset/asset'
import { useAssetHistory } from 'hooks/useAssetHistory'
import { useCallback } from 'react'

export const useAssetAccelerationHistory = () => {
	const accelerationHistory = useAssetHistory<{
		date: Date
		x: number
		y: number
		z: number
	}>({
		query: useCallback(({ asset, table, startDate, endDate, binInterval }) => {
			const queryString = `
          SELECT
            bin(time, ${binInterval}) as date,
            MIN(CASE WHEN measure_name = '${SensorProperties.Environment}.x' THEN measure_value::double END) as x,
            MIN(CASE WHEN measure_name = '${SensorProperties.Environment}.y' THEN measure_value::double END) as y,
            MIN(CASE WHEN measure_name = '${SensorProperties.Environment}.z' THEN measure_value::double END) as z
          FROM ${table}
          WHERE deviceId='${asset.id}' 
            AND (measure_name='${SensorProperties.Environment}.x'
            OR measure_name='${SensorProperties.Environment}.y'
            OR measure_name='${SensorProperties.Environment}.z')
            AND date_trunc('second', time) >= '${startDate}'
            AND date_trunc('second', time) <= '${endDate}'
          GROUP BY bin(time, ${binInterval})
          ORDER BY bin(time, ${binInterval}) DESC
        `

			return queryString
		}, []),
	})

	// Log the result to the console
	console.log('Acceleration History Result:', accelerationHistory)

	return accelerationHistory
}
