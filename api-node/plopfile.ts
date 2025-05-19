import { NodePlopAPI } from 'plop'
import { crudGenerator } from './plop/generators/crud'
import { routeGenerator } from './plop/generators/route'

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

	crudGenerator(plop)
	routeGenerator(plop)
}
