import { NodePlopAPI } from 'plop'
import mvvmGenerator from './plop/generators/mvvm'
import serviceGenerator from './plop/generators/service'

export default function (plop: NodePlopAPI) {
	plop.setHelper('eq', function (a, b, options) {
		if (
			!options ||
			typeof options.fn !== 'function' ||
			typeof options.inverse !== 'function'
		) {
			return a === b
		}
		return a === b ? options.fn(this) : options.inverse(this)
	})

	serviceGenerator(plop)
	mvvmGenerator(plop)
}
