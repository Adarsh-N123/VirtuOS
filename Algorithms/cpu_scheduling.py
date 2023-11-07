
import heapq 
def first_come_first_serve(arrival_time_array , burst_time_array) : 
    # arrival time - process number - burst time
    joint_list = []
    total_processes = len(arrival_time_array)
    for i in range(total_processes):
        joint_list.append([arrival_time_array[i],i,burst_time_array[i]])
    
    joint_list.sort()

    # store : [process number , starting time , ending time]
    process_order = [] 
    waiting_time = [0]*total_processes 
    turnaround_time = [0]*total_processes
    time =0 
    for i in joint_list:
        arrival = i[0]
        if (arrival <= time):
            process_order.append([i[1] , time , time+i[2]])
            time = time + i[2]
            waiting_time[i[1]] = time-arrival
            turnaround_time[i[1]] = time-arrival
        else :
            process_order.append([i[1] , i[0] , i[0]+i[2]])
            time = i[0] + i[2]
            waiting_time[i[1]] = 0
            turnaround_time = time - arrival 
    
    average_Waiting_time = sum(waiting_time)/total_processes 

    #backup list will store at each t sec which process will run 
    backup_list = [-1]*time 

    for i in process_order:
        start = i[1]
        end = i[2]
        for j in range(start,end):
            backup_list[j] = i[0]
    return process_order,backup_list , waiting_time , turnaround_time , average_Waiting_time


def shortest_job_first(arrival_time_array , burst_time_array):
    # in this we return 

    joint_arr =[]
    total_processes = len(arrival_time_array) 
    remaining_time = burst_time_array.copy() 

    process_at_each_time = [] 
    time = 0 
    waiting_time = [0]*total_processes 
    turnaround_time = [0]*total_processes 
    curr = -1
    while True:

        idx = -1 
        t1 = 1e9 
        for i in range(total_processes):
            if (arrival_time_array[i] <= time ) :
                if (remaining_time[i] > 0 and remaining_time[i] < t1) :
                    idx = i 
                    t1 = remaining_time[i]  
        if (idx == -1) : 
            if max(remaining_time) == 0:
                break  
            else:
                process_at_each_time.append(-1)
        else :
            if (curr != -1 and remaining_time[idx] == remaining_time[curr] ):
                idx = curr 
            process_at_each_time.append(idx) 
            remaining_time[idx]-=1   

            if (remaining_time[idx] == 0) :
                waiting_time[idx] = 1+time-arrival_time_array[idx]-burst_time_array[idx]  
                turnaround_time = 1+time - arrival_time_array[idx]
            curr = idx
        time+=1 
    average_Waiting_time = sum(waiting_time)/total_processes 
    return process_at_each_time ,waiting_time ,turnaround_time , average_Waiting_time
        
def longest_job_first():
    pass 

# priority = 1 : has highest ppriority
def priority_scheduling_non_preemptive(arrival_time , burst_time , priority):

    arr = []
    cnt = len(arrival_time)
    for i in range(cnt):
        arr.append([arrival_time[i] , priority[i] , burst_time , i])
    arr.sort()
    curr = -1 
    time = 0 
    process_at_each_time = []
    remaining_time_arr = burst_time.copy()
    
    while True:

        idx = -1
        max_priority = 1e9 
        for i in arr :

            arrive = i[0]
            priority = i[1] 
            time_taken = i[2]
            process = i[3]
            if i[0] <= time:
                
                if priority < max_priority and remaining_time_arr[process] > 0 :
                    idx = process 
                    max_priority = priority 
            
        if idx == -1 :
            
            if max(remaining_time_arr)==0:
                break 
            else:
                process_at_each_time.append(-1)
                time+=1 
        else:

            for i in range(remaining_time_arr[idx]):
                process_at_each_time.append(idx) 
                time+=1 
            remaining_time_arr[idx] = 0
            
    return process_at_each_time

    pass

def priority_scheduling_preemptive(arrival_time , burst_time , priority):

    pass 

def round_robin(): 
    pass

def shortest_remaining_time_first():
    pass 


def longest_remaining_time_first():
    pass 

def highest_response_ration_next():
    pass 

def multiple_queue_scheduling():
    pass 

def multilevel_feedback_queue_scheduling():
    pass




arr1 = [0,0,1,0,3]
arr2 = [4,5,1,2,1]
priority = [1,4,2,3,1]
print(first_come_first_serve(arr1,arr2))
print(shortest_job_first(arr1,arr2))
print(priority_scheduling_non_preemptive(arr1,arr2,priority))