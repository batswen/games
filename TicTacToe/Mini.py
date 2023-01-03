class Minimax:
    def test(self, board):
        "Calculates the score"
        pts=self.test_line(board, 0, 1, 2)
        pts+=self.test_line(board, 3, 4, 5)
        pts+=self.test_line(board, 6, 7, 8)

        pts+=self.test_line(board, 0, 3, 6)
        pts+=self.test_line(board, 1, 4, 7)
        pts+=self.test_line(board, 2, 5, 8)

        pts+=self.test_line(board, 0, 4, 8)
        pts+=self.test_line(board, 2, 4, 6)

        return pts

    def test_line(self, board, a, b, c):
        if board[a]==board[b]==board[c]!=0:
            return 100 if board[a] == 2 else -100

        if board[a] != 0 and ((board[a] == board[b] and board[c] == 0) or (board[a] == board[c] and board[b] == 0)):
            return 10 if board[a] == 2 else -10
        if board[b] != 0 and board[b] == board[c] and board[a] == 0:
            return 10 if board[b] == 2 else -10

        if board[a] != 0 and board[b] == 0 and board[c] == 0:
            return 1 if board[a] == 2 else -1
        if board[a] == 0 and board[b]!=0 and board[c] == 0:
            return 1 if board[b] == 2 else -1
        if board[a] == 0 and board[b] == 0 and board[c]!=0:
            return 1 if board[c] == 2 else -1
        return 0

    def generate_moves(self, board):
        moves=[]
        for i in range(9):
            if board[i] == 0:
                moves.append(i)
        return moves

    def minimax(self,  board,  player, depth):
        best_move = -1
        best_score = -1000000000 if player == 2 else 1000000000

        moves=self.generate_moves(board)

        if depth == 0 or not moves:
            best_score = self.test(board)
        else:
            for move in moves:
                board[move]=player
                if player==2:   # "AI"
                    res=self.minimax(board, 1, depth-1)
                    if res[0]>best_score:
                        best_score=res[0]
                        best_move=move
                else:           # Human
                    res=self.minimax(board, 2, depth-1)
                    if res[0]<best_score:
                        best_score=res[0]
                        best_move=move
                board[move]=0
        return [best_score, best_move]

if __name__ == '__main__':
    DEPTH = 2
    t = Minimax()

    print('Depth 0', t.minimax([1, 0, 0,  0, 2, 0,  0, 0, 1], 2, 0))
    print('Depth 1', t.minimax([1, 0, 0,  0, 2, 0,  0, 0, 1], 2, 1))
    print('Depth 2', t.minimax([1, 0, 0,  0, 2, 0,  0, 0, 1], 2, 2))
    print('Depth 3', t.minimax([1, 0, 0,  0, 2, 0,  0, 0, 1], 2, 3))
    print('Depth 4', t.minimax([1, 0, 0,  0, 2, 0,  0, 0, 1], 2, 4))
    print(t.minimax([2, 1, 0,  0, 1, 0,  0, 0, 0], 2, DEPTH))
