import { DropDownUserSettings } from '@/components/DropDownUserSettings/DropDownUserSettings'
import { titleAtom } from '@/store/atoms/titleAtom'
import { useAtom } from 'jotai'
import { SheetApp } from './SheetApp'

export function Header() {
	const [titleHeader] = useAtom(titleAtom)

	return (
		<header className="bg-white shadow-md sticky top-0 z-10">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<SheetApp />
					<h1 className="text-xl font-semibold capitalize md:block hidden">
						{titleHeader}
					</h1>
				</div>
				<h1 className="text-xl font-semibold capitalize md:hidden block">
					{titleHeader}
				</h1>
				<DropDownUserSettings />
			</div>
		</header>
	)
}
