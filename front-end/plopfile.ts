import { NodePlopAPI } from 'plop'
import crud from './plop/generators/crud'
import mvvmGenerator from './plop/generators/mvvm'
import serviceGenerator from './plop/generators/service'

export default function (plop: NodePlopAPI) {
	// Helper para comparação de igualdade
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

	// Helper para verificar se array inclui valor
	plop.setHelper('includes', function (array, value, options) {
		if (!options || typeof options.fn !== 'function') {
			return Array.isArray(array) ? array.includes(value) : false
		}

		if (!Array.isArray(array)) {
			return options.inverse ? options.inverse(this) : false
		}

		return array.includes(value)
			? (options.fn ? options.fn(this) : true)
			: (options.inverse ? options.inverse(this) : false)
	})

	// Helper para título (primeira letra maiúscula)
	plop.setHelper('titleCase', function (str) {
		if (!str) return ''
		return str.charAt(0).toUpperCase() + str.slice(1)
	})

	// Helper para adicionar números
	plop.setHelper('add', function (a, b) {
		return a + b
	})

	// Helper para unless (contrário de if)
	plop.setHelper('unless', function (conditional, options) {
		if (!options || typeof options.fn !== 'function') {
			return !conditional
		}

		if (!conditional) {
			return options.fn ? options.fn(this) : true
		}

		return options.inverse ? options.inverse(this) : false
	})

	serviceGenerator(plop)
	mvvmGenerator(plop)
	crud(plop)
}
