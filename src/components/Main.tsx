import type { FunctionComponent, PropsWithChildren } from 'react'

export const Main: FunctionComponent<PropsWithChildren<unknown>> = ({
	children,
}) => (
	<main>
		<div className="row justify-content-center">
			<div className="col-md-11">{children}</div>
		</div>
	</main>
)
