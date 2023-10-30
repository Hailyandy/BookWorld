export function mapToClass(arr, ClassType) {
    return arr.map(item => new ClassType(item));
}
