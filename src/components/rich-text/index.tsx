import {
	DefaultNodeTypes,
	SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
	JSXConvertersFunction,
	RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import type {
	BannerBlock as BannerBlockProps,
	CallToActionBlock as CTABlockProps,
	MediaBlock as MediaBlockProps,
} from "@/payload-types";

import { BannerBlock } from "../blocks/Banner/Component";
import { CallToActionBlock } from "../blocks/CallToAction/Component";
import { MediaBlock } from "../blocks/MediaBlock/Component";

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	ul: ({ node, nodesToJSX }) => (
		<ul className="list-none pl-0">{nodesToJSX({ nodes: node.children })}</ul>
	),
	li: ({ node, nodesToJSX }) => (
		<li className="relative pl-8">
			<span className="absolute top-[0.45em] left-0 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
				<CheckIcon aria-hidden className="size-3" weight="bold" />
			</span>
			{nodesToJSX({ nodes: node.children })}
		</li>
	),
	listitem: ({ node, nodesToJSX }) => (
		<li className="relative pl-8">
			<span className="absolute top-1/2 -left-6 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
				<CheckIcon aria-hidden className="size-3" weight="bold" />
			</span>
			{nodesToJSX({ nodes: node.children })}
		</li>
	),
	list: ({ node, nodesToJSX }) => (
		<ul className="list-none pl-0">{nodesToJSX({ nodes: node.children })}</ul>
	),
	blocks: {
		banner: ({ node }) => (
			<BannerBlock className="col-start-2 mb-4" {...node.fields} />
		),
		mediaBlock: ({ node }) => (
			<MediaBlock
				className="col-span-3 col-start-1"
				imgClassName="m-0"
				{...node.fields}
				captionClassName="mx-auto max-w-3xl"
				disableInnerContainer={true}
				enableGutter={false}
			/>
		),
		cta: ({ node }) => <CallToActionBlock {...node.fields} />,
	},
});

type Props = {
	data: SerializedEditorState;
	enableGutter?: boolean;
	enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText: React.FC<Props> = (props) => {
	const { className, enableProse = true, enableGutter = true, ...rest } = props;
	return (
		<RichTextWithoutBlocks
			className={cn(
				{
					container: enableGutter,
					"max-w-none": !enableGutter,
					"prose md:prose-md lg:prose-lg prose-stone dark:prose-invert mx-auto":
						enableProse,
				},
				className
			)}
			converters={jsxConverters}
			{...rest}
		/>
	);
};
