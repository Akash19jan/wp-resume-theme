import { MediaUpload, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody, PanelRow } from '@wordpress/components';
import { WPIconPicker } from '../../components/WPIconPicker';
import { getThemeColors } from '../../utils/themeColors';

export default function Edit({ attributes, setAttributes }) {
	const {
		name,
		title,
		photo = { url: '', alt: '', title: '' },
		socialLinks = [],
		contactItems = [],
	} = attributes;

	const blockProps = useBlockProps({ className: 'p-6 bg-white rounded-lg shadow-md' });
	const themeColors = getThemeColors();

	const updateSocial = (index, field, value) => {
		const updated = [...(socialLinks || [])];
		const item = updated[index] || {};
		updated[index] = { ...item, [field]: value };
		setAttributes({ socialLinks: updated });
	};

	const updateContact = (index, field, value) => {
		const updated = [...(contactItems || [])];
		const item = updated[index] || {};
		updated[index] = { ...item, [field]: value };
		setAttributes({ contactItems: updated });
	};

	return (
		<div {...blockProps}>
			<MediaUpload
				onSelect={(media) =>
					setAttributes({
						photo: {
							url: media.url,
							alt: media.alt,
							title: media.title,
						},
					})
				}
				allowedTypes={['image']}
				render={({ open }) =>
					photo?.url ? (
						<div>
							<img src={photo.url} alt={photo.alt} className="w-24 h-24 rounded-full mb-4" />
							<Button onClick={open} variant="secondary">Change Photo</Button>
						</div>
					) : (
						<Button onClick={open} variant="primary">Upload Photo</Button>
					)
				}
			/>

			<RichText
				tagName="h2"
				className="text-3xl font-bold mt-4"
				value={name}
				onChange={(value) => setAttributes({ name: value })}
				placeholder="Your Name"
			/>

			<RichText
				tagName="p"
				className="text-lg text-gray-600 mt-1"
				value={title}
				onChange={(value) => setAttributes({ title: value })}
				placeholder="Your Title"
			/>

			<PanelBody title="Social Links" initialOpen={true}>
				{socialLinks.map((item = {}, index) => (
					<PanelRow key={index}>
						<WPIconPicker
							value={item.icon || ''}
							onChange={(val) => updateSocial(index, 'icon', val)}
						/>
						<TextControl
							label="Title"
							value={item.title || ''}
							onChange={(val) => updateSocial(index, 'title', val)}
						/>
						<TextControl
							label="Alt Text"
							value={item.alt || ''}
							onChange={(val) => updateSocial(index, 'alt', val)}
						/>
						<TextControl
							label="URL"
							value={item.url || ''}
							onChange={(val) => updateSocial(index, 'url', val)}
						/>
					</PanelRow>
				))}
				<Button
					variant="secondary"
					onClick={() =>
						setAttributes({
							socialLinks: [...socialLinks, { icon: 'wordpress', title: '', alt: '', url: '', iconColor: '' }],
						})
					}
				>
					Add Social Link
				</Button>
			</PanelBody>

			<PanelBody title="Contact Items" initialOpen={false}>
				{contactItems.map((item = {}, index) => (
					<PanelRow key={index}>
						<WPIconPicker
							value={item.icon || ''}
							onChange={(val) => updateContact(index, 'icon', val)}
						/>
						<TextControl
							label="Text"
							value={item.text || ''}
							onChange={(val) => updateContact(index, 'text', val)}
						/>
					</PanelRow>
				))}
				<Button
					variant="secondary"
					onClick={() =>
						setAttributes({
							contactItems: [...contactItems, { type: '', icon: 'mobile', text: '', iconColor: '' }],
						})
					}
				>
					Add Contact
				</Button>
			</PanelBody>
		</div>
	);
}
