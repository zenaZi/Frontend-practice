function elements(size) {
    list = [];
    for (let i = 0; i < size; ++i)
        list.push({n: null});
    return list;
}

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let content = new Vue({
    el: '#field',
    data: {
        winner: "",
        player1: "",
        player2: "",
        size_field: "",
        action: true,
        win: false,
        draw: false,
        entering_name: true,
        start_game: false,
        playing_with_bot: true,
        field: [],
    },
    methods: {

        checking_progress() {
            // горизонтальная линия
            for (let i = 0; i < this.size_field; ++i) {
                let k = 0;
                for (let j = 0; j < this.size_field - 1; ++j)
                    if (this.field[i][j].n != null && this.field[i][j].n == this.field[i][j + 1].n)
                        ++k;
                if (this.checking_game(k)) return;
            }

            // вертикальная линия
            for (let i = 0; i < this.size_field; ++i) {
                let k = 0;
                for (let j = 0; j < this.size_field - 1; ++j)
                    if (this.field[j][i].n != null && this.field[j][i].n == this.field[j + 1][i].n)
                        ++k;
                if (this.checking_game(k)) return;
            }

            // диагональная линия
            for (let i = 0, k = 0; i < this.size_field - 1; ++i) {
                if (this.field[i][i].n != null && this.field[i][i].n == this.field[i + 1][i + 1].n)
                    ++k;
                if (this.checking_game(k)) return;
            }

            for (let i = 0, k = 0; i < this.size_field - 1; ++i) {
                if (this.field[i][this.size_field-1-i].n != null && this.field[i][this.size_field - 1 - i].n == this.field[i + 1][this.size_field - 2 - i].n)
                    ++k;
                if (this.checking_game(k)) return;
            }
        },

        checking_game(k) {
            if (k == this.size_field - 1) {
                this.win = true;
                this.winner = this.action ? this.player2 : this.player1;
                this.start_game = false;
            }
            return this.win;
        },

        // проверка игры на ничью с пк
        _action_bot() {
            let flag = false;
            end_loop: for (let i = 0; i < this.size_field; ++i)
                for (let j = 0; j < this.size_field; ++j)
                    if (this.field[i][j].n == null) {
                        flag = true;
                        break end_loop;
                    }

            if (!flag || this.win) {
                this.entering_name = false;
                return true;
            }

            while (true) {
                let row = get_random_int(0, this.size_field - 1);
                let col = get_random_int(0, this.size_field - 1);
                if (this.field[row][col].n == null && !this.win) {
                    this.field[row][col].n = this.action ? 'X' : 'O';
                    this.action = !this.action;
                    break;
                }
            }
            return false;
        },

        // проверка игры на ничью с человеком
        playing_human() {
            let flag = false;
            end_loop: for (let i = 0; i < this.size_field; ++i)
                for (let j = 0; j < this.size_field; ++j)
                    if (this.field[i][j].n == null) {
                        flag = true;
                        break end_loop;
                    }

            if (!flag || this.win) {
                this.entering_name = false;
                return true;
            }
        },

        // проверка игры с пк
        bot_game() {
            this.playing_with_bot = !this.playing_with_bot;
        },

        start_games() {
            this.entering_name = false;
            this.start_game = true;
            for (let i = 0; i < this.size_field; ++i)
                this.field.push(elements(this.size_field));
        },

        restart_game() {
            this.winner = "";
            this.action = true;
            this.win = false;
            this.draw = false;
            this.entering_name = true;
            this.start_game = false;
            this.field = [];
        },

        action_game(row, col) {
            if (this.field[row][col].n == null && !this.win) {
                this.field[row][col].n = this.action ? 'X' : 'O';
                this.action = !this.action;
                this.checking_progress();
                if (this.playing_with_bot) {
                    let flag = this._action_bot();
                    this.checking_progress();
                    if (flag && !this.win)
                        this.draw = true;
                }
                else {
                    let flag = this.playing_human();
                    this.checking_progress();
                    if (flag && !this.win)
                        this.draw = true;
                }
            }
        }
    },
})
