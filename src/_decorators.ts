function Component(id: number): Function {
	console.log('Initializing component...');
	return (target: Function) => {
		console.log('Running component...');
		target.prototype.id = id;
	};
}

function Logger(): Function {
	console.log('Initializing logger...');
	return (target: Function) => {
		console.log('Running logger...');
	};
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void {
	console.log(propertyKey);
	const oldValue = propertyDescriptor.value;
	propertyDescriptor.value = function (...args: any[]): number {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string): void {
	let value: number;

	const getter = (): number => {
		console.log('Get');
		return value;
	};

	const setter = (newValue: number): void => {
		console.log('Set');
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		set: setter,
		get: getter,
	});
}

function Param(target: Object, propertyKey: string, index: number): void {
	console.log(propertyKey, index);
}

@Logger()
@Component(10)
export class User {
	@Prop id: number;

	@Method
	updateId(@Param newId: number): number {
		this.id = newId;
		return this.id;
	}
}

console.log(new User().id);
console.log(new User().updateId(2));
