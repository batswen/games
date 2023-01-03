import random
import Mini

class Tic:
    def __init__(self):
        self.board = [0, 0, 0,  0, 0, 0,  0, 0, 0]
        self.moves = 0
        self.mini = Mini.Minimax()

    def play(self):
        player = 0 if random.random()<.5 else 1
        gewonnen = False
        self.moves = 0
        while gewonnen == False:
            player = 1-player
            print('Next game:')
            self.draw()
            if player == 0:
                print('Your turn.')
                self.human()
            else:
                print('AI is thinking...', end = '')
                self.ai()
                print('done.')

            self.moves+ = 1
            gewonnen = self.test_winner()
            if gewonnen == 0:
                if self.moves> = 9:
                    print('No winner.')
                    gewonnen = True

    def human(self):
        while True:
            print('X:', end = '')
            try:
                move = int(input())
                if move == -1:
                    return
                if self.board[move] == 0:
                    self.board[move] = 1
                    break
                else:
                    raise error
            except:
                print(random.choice(['Nö.',  'Really?',  'Nope. -- Lara Croft']))

    def ai(self):
        move = self.mini.minimax(self.board, 2, 2)
        self.board[move[1]] = 2

    def test_winner(self):
        win_pos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 5, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for pos in win_pos:
            if self.board[pos[0]] == self.board[pos[1]] == self.board[pos[2]] == 1:
                print('X wins.')
                return True
            if self.board[pos[0]] == self.board[pos[1]] == self.board[pos[2]] == 2:
                print('O wins.')
                return True
        return False

    def draw(self):
        for y in range(3):
            for x in range(3):
                p = self.board[x+y*3]
                if p == 0:
                    print('-', end = '')
                elif p == 1:
                    print('X', end = '')
                else:
                    print('O', end = '')
            print()
        print()

if __name__ == '__main__':
    t = Tic()
    t.play()
