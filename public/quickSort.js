array = []
for (var i = 0; i < 8; i++) {
	array.push(Math.floor(Math.random() * 100)) //随机生成 8个小于100的数
}
var quickSort = function (arr) {
	if (arr.length <= 1) {
		return arr;
	}
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex, 1)[0]; //使用基准数，并将原来的数组分离，再定义两个空数组，用来存放一左一右的两个子集
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) { //开始遍历数组，小于"基准"的元素放入左边的子集，大于基准的元素放入右边的子集。
		if (arr[i] < pivot) {
			left.push(arr[i]);  //小于基准数的放在左边
		} else {
			right.push(arr[i]); //大的放在右边
		}
	}
	return quickSort(left).concat([pivot], quickSort(right));//使用递归不断重复这个过程，就可以得到排序后的数组
};
console.log(array)
quickSort(array)
