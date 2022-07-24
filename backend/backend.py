from collections import defaultdict
from email.policy import default
import math
import random
import sys


class backend(object):
    def __init__(self):
        self.users = defaultdict(list)
        self.propotion_table = [(20, 1), (45, 2), (55, 3), (60, 4), (61, 5)] # 20:15:10:5:1
        self.level_c = [32.78, 24.59, 16.39, 8.19, 1.63]

    def get(self, usr):
        cur_count = self.users[usr]
        expects = [self.at_least_counter(32.78), self.at_least_counter(24.59), self.at_least_counter(16.39), self.at_least_counter(8.19), self.at_least_counter(1.63)]
        res = [0] * 5
        
        for level, level_count in enumerate(expects):
            if self.open_lottery(usr, level_count, self.level_c[level]):
                res[level] = sys.maxsize
        
        for level in range(4, -1, -1):
            if res[level] == sys.maxsize:
                return level

        c = self.calculate()
        if c < 20 / 61:
            return 0
        elif c < 45 / 61:
            return 1
        elif c < 55 / 61:
            return 2
        elif c < 60 / 61:
            return 3
        else:
            return 4
        
    def set(self, usr, click):
        if click:
            self.users[usr] = 1 + self.users.get(usr, 0)
    
    def at_least_counter(self, c):
        """
        c is the initial probability for the NFT level
        e.g. c = 0.05 means the probability to get the level is 0.05
        """
        add = 0.02
        n = 50
        currentp = 0
        successp = 0
        expectation = 0
        maxN = n + math.ceil((1-c) / add)
        for i in range(maxN):
            if i < n:
                currentp = (1 - successp) * c
            else:
                currentp = (1 - successp) * (c + (i-n+1) * add)
            successp += currentp
            expectation += currentp * (i + 1)
        return expectation

    def open_lottery(self, usr, cur_counter, expectation, level_c):
        flag = False
        if cur_counter > expectation:
            self.users[usr] = 0
            flag = True
        else:
            p_anti = self.anti_addiction(cur_counter)
            if random.random() + p_anti>= level_c:
                flag = True

        return flag

    def anti_addiction(self, cur_counter):

        def roll_dice(n, s):
            value = 0 
            for i in range(n):
                value += random.random(s + 1)
            return value

        roll1 = roll_dice(1, 12)
        roll2 = roll_dice(1, 12)
        roll3 = roll_dice(1, 12)
        frequency = roll1 + roll2 + roll3
        frequency -= min(roll1, roll2, roll3)

        return frequency / 61

    def calculate(self):
        x = random.random()
        table = self.propotion_table

        def lookup_value(table, x):
            # assume 0 ≤ x < sum_of_weights
            cumulative_weight = 0
            for (weight, value) in table:
                cumulative_weight += weight
                if x < cumulative_weight:
                    return value

        def roll(table):
            sum_of_weights = 0
            for (weight, value) in table:
                sum_of_weights += weight

            x = random(sum_of_weights)
            return lookup_value(self.propotion_table, x)
        return roll(table)


