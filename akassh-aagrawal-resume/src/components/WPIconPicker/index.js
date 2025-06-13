import { useState } from '@wordpress/element';
import { BaseControl, TextControl, Icon, Button } from '@wordpress/components';
import * as wpIcons from '@wordpress/icons';

import './style.scss';

const iconList = Object.keys(wpIcons).filter(
	(key) => typeof wpIcons[key] === 'object' && wpIcons[key]?.props
);

export function WPIconPicker({ value, onChange }) {
	const [search, setSearch] = useState('');
	const [showPicker, setShowPicker] = useState(false);

	const filteredIcons = iconList.filter((icon) =>
		icon.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<BaseControl label="Select Icon" __nextHasNoMarginBottom>
			<Button
				variant="secondary"
				onClick={() => setShowPicker(!showPicker)}
				aria-expanded={showPicker}
				style={{ marginBottom: '8px' }}
			>
				{value ? `Icon: ${value}` : 'Choose Icon'}
			</Button>

			{showPicker && (
				<div>
					<TextControl
						value={search}
						onChange={(val) => setSearch(val)}
						placeholder="Search icons..."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<div className="wp-icon-grid">
						{filteredIcons.map((iconKey) => (
							<div
								key={iconKey}
								className={`wp-icon-cell ${value === iconKey ? 'selected' : ''}`}
								onClick={() => {
									onChange(iconKey);
									setShowPicker(false);
								}}
								title={iconKey}
							>
								<Icon icon={wpIcons[iconKey]} size={20} />
							</div>
						))}
					</div>
				</div>
			)}
		</BaseControl>
	);
}
