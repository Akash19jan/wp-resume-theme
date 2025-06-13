import { useBlockProps, RichText } from '@wordpress/block-editor';
import * as WPIcons from '@wordpress/icons';
import { Icon } from '@wordpress/components';

export default function Save({ attributes }) {
	const { name, title, photo, socialLinks = [], contactItems = [] } = attributes;

	return (
		<div
            {...useBlockProps.save({
                className:
                    'wp-block-akassh-bio flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 bg-white rounded-lg shadow-md gap-6',
            })}
        >
            {/* Left: Photo + Name/Title */}
            <div className="flex items-center gap-4">
                {photo?.url && (
                    <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                )}
                <div>
                    <RichText.Content tagName="h2" value={name} className="text-xl font-bold mb-1" />
                    <RichText.Content tagName="p" value={title} className="text-gray-600 text-sm" />
                </div>
            </div>

            {/* Right: Contact + Social */}
            <div className="flex flex-col items-start gap-2 text-sm text-left shrink-0">
                {contactItems.map((item, idx) => {
                    const IconComponent = WPIcons[item.icon] || null;
                    const href = item.type?.toLowerCase() === 'email'
                        ? `mailto:${item.text}`
                        : item.type?.toLowerCase() === 'phone'
                        ? `tel:${item.text}`
                        : null;

                    return (
                        <div key={idx} className="flex items-center gap-2">
                            {IconComponent && (
                                <Icon icon={IconComponent} style={{ color: item.iconColor || undefined }} />
                            )}
                            {href ? (
                                <a href={href} className="hover:underline">{item.text}</a>
                            ) : (
                                <span>{item.text}</span>
                            )}
                        </div>
                    );
                })}

                <div className="flex flex-wrap gap-3 mt-1">
                    {socialLinks.map((item, idx) => {
                        const IconComponent = WPIcons[item.icon] || null;
                        return (
                            <a
                                key={idx}
                                href={item.url}
                                className="flex items-center gap-1 hover:underline"
                                title={item.title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {IconComponent && (
                                    <Icon icon={IconComponent} style={{ color: item.iconColor || undefined }} />
                                )}
                                <span>{item.alt}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>

	);
}
