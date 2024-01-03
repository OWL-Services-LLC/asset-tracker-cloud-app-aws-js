import { type ConfigData } from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { presetConfigs } from 'asset/config.js'
import styles from 'components/Asset/Configuration/Presets.module.css'
import { CollapsablePreset } from 'components/CollapsablePreset'
import { IconWithText, PresetsIcon } from 'components/FeatherIcon.js'

export const Presets = ({
	setDesiredConfig,
}: {
	setDesiredConfig: React.Dispatch<React.SetStateAction<ConfigData>>
	currentDesiredConfig: ConfigData
}) => {
	return (
		<div className={styles.wrapper}>
			<CollapsablePreset
				title={
					<IconWithText>
						<PresetsIcon size={22} />
						Configuration Presets
					</IconWithText>
				}
				id="asset:presets"
				data-intro="This provides sensible presets for different scenarios."
			>
				<>
					<div className="preset-container">
						<p data-test="about">
							Below are configuration presets that provide sensible defaults for
							typical application scenarios. Click 'Apply' to upload these
							settings to the asset.
						</p>
						<div>
							{Object.keys(presetConfigs).map((element) => (
								<section
									className={styles.preset}
									key={element}
									data-test={element}
								>
									<div>
										<h5 className={styles.title}>
											{presetConfigs[`${element}`].label}
										</h5>
										<p>{presetConfigs[`${element}`].description}</p>
									</div>
									<button
										key={`${element}-preset-config`}
										type="button"
										className="btn btn-outline-primary ms-2"
										onClick={() =>
											setDesiredConfig(presetConfigs[`${element}`].config)
										}
									>
										Apply
									</button>
								</section>
							))}
						</div>
					</div>
				</>
			</CollapsablePreset>
		</div>
	)
}
