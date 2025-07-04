import { NodePlopAPI } from 'plop'
import { crudGenerator } from './plop/generators/crud'
import { routeGenerator } from './plop/generators/route'
import { manyToManyGenerator } from './plop/generators/manyToMany'
import { addManyToManyGenerator } from './plop/generators/addManyToMany'

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
	manyToManyGenerator(plop)
	addManyToManyGenerator(plop)
}
