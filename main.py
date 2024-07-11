

def glob(candidates, target):

    ret = []

    # while(True):
    def helper(arr,j):
        if sum(arr) > target:
            return

        cur = candidates[j:]
        
        for i in range(len(cur)):
            temp = arr.copy()
            temp.append(cur[i])
            if sum(temp) == target:
                print(cur)
                ret.append(temp)

            else:
                helper(temp, i)

        return 

    helper([],0)

    return ret


print(glob([2,3,5], 8))