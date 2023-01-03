from tkinter import *
import Mini

class Application(Frame):
    def __init__(self,master = None):
        super().__init__(master)
        self.buttons = [0, 0, 0,  0, 0, 0,  0, 0, 0]
        self.board = [0, 0, 0,  0, 0, 0,  0, 0, 0]
        self.master = master
        self.symbol = 'X'
        self.moves = 0
        self.create_widgets()
        self.mini = Mini.Minimax()
        self.master.title(self.symbol)

    def create_widgets(self):
        for i in range(9):
            self.buttons[i] = Button(self.master, height = 3, width = 3, text = i)
            self.buttons[i]['command'] = lambda il = i: self.knopf(il)
            self.buttons[i].grid(row = i // 3, column = i % 3)

    def knopf(self,n):
        if self.board[n] == 0:
            self.board[n] = 1
            self.buttons[n]['text'] = self.symbol
            self.moves += 1
            self.dis(True)
            if self.test_winner() == '' and self.moves < 9:
                ai_res = self.ai()
                self.buttons[ai_res]['text'] = 'O'
                self.board[ai_res] = 2
                self.moves += 1
            self.dis(False)
        #print(self.moves)
        winner = self.test_winner()
        if self.moves >= 9:
            print('No winner!')
            root.destroy()
        if winner != '':
            print('{} wins!'.format(winner))
            root.destroy()

    def test_winner(self):
        "See who's le winner"
        win_pos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 5, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for pos in win_pos:
            if self.board[pos[0]] == self.board[pos[1]] == self.board[pos[2]] == 1:
                return 'X'
            if self.board[pos[0]] == self.board[pos[1]] == self.board[pos[2]] == 2:
                return 'O'
        return ''

    def ai(self):
        move = self.mini.minimax(self.board, 2, 2)
        return move[1]

    def dis(self,dis):
        for i in range(9):
            if dis == True:
                self.buttons[i].config(state = 'disabled')
            else:
                self.buttons[i].config(state = 'normal')

if __name__=='__main__':
    root=Tk()
    app=Application(master = root)
#root.mainloop()
