import React from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

interface CustomToggleProps {
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const KebabDropdownToggle = React.forwardRef<
	HTMLSpanElement,
	CustomToggleProps
>(({ onClick }, ref) => (
	// Ensure this component is being used as the toggle, but use the dropdown logic that is passed to it
	<span
		className='kebab-dropdown'
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		style={{ cursor: 'pointer' }}
	>
		<ThreeDotsVertical />
	</span>
));

export default KebabDropdownToggle;