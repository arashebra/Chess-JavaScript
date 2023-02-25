const Rook_black = '&#9820;';   // Castle   // -1
const Knight_black = '&#9822;'; // Horse    // -2
const Bishop_black = '&#9821;'; // Fil      // -3
const Queen_black = '&#9819;';  // Vazir    // -4
const King_black = '&#9818;';   // Shah     // -5
const Pawn_black = '&#9823;';   // Sarbaz   // -6

const Rook_white = '&#9814;';   // Castle   // 1
const Knight_white = '&#9816;'; // Horse    // 2
const Bishop_white = '&#9815;'; // Fil      // 3
const Queen_white = '&#9813;';  // Vazir    // 4
const King_white = '&#9812;';   // Shah     // 5
const Pawn_white = '&#9817;';   // Sarbaz   // 6
//////////////////////////////////////////////
const Rook_black_code = -1;
const Knight_black_code = -2;
const Bishop_black_code = -3;
const Queen_black_code = -4;
const King_black_code = -5;
const Pawn_black_code = -6;

const Rook_white_code = 1;
const Knight_white_code = 2;
const Bishop_white_code = 3;
const Queen_white_code = 4;
const King_white_code = 5;
const Pawn_white_code = 6;

let final_game_situation = 0;

let player_order = true; // true -> white & false -> black
let player_order_doc_elem = document.getElementById('player_name');

let threaten_side = 0 // 0 -> no threaten_side & 1 -> white side & -1 -> black side

let pot_condition_counter = 0 // در صورتی که فقط شاه یکی از طرفین باقی مانده باشد و اگر 50 حرکت انجام شود آنگاه نتیجه بازی پات هست
let pot_condition_count = 50 // 


let board = [
    [-1, -2, -3, -4, -5, -3, -2, -1],
    [-6, -6, -6, -6, -6, -6, -6, -6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [1, 2, 3, 4, 5, 3, 2, 1]
];


// 1 -> one & 2 -> possible_move_ments
let board_on = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

// 3 -> Threat 
let board_threat = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

function board_off_all() {
    for (let row in board_on)
        for (let column in board_on)
            if (board_on[row][column] > 0)
                if (board_on[row][column] != 3)
                    board_on[row][column] = 0;

}

function possible_movements(row, column) {

    let chess_piece_code = board[row][column];

    // Pawn_white = 6
    if (chess_piece_code == 6) {
        board_on[row][column] = 1;
        if (row == 6) {
            if (row - 1 >= 0) {
                if (board[row - 1][column] == 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column] = 6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column] = 2;
                }
                if (board[row - 2][column] == 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 2][column] = 6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 2][column] = 2;
                }
            }

        } else if (row != 6) {
            if (row - 1 >= 0)
                if (board[row - 1][column] == 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column] = 6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column] = 2;
                }
        }
        if (row - 1 >= 0)
            if (column - 1 >= 0)
                if (board[row - 1][column - 1] < 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column - 1] = 6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column - 1] = 2
                }
        if (row - 1 >= 0)
            if (column + 1 < 8)
                if (board[row - 1][column + 1] < 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column + 1] = 6;

                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column + 1] = 2
                }
    }

    // Pawn_black = -6 
    if (chess_piece_code == -6) {
        board_on[row][column] = 1;

        if (row == 1) {
            if (board[row + 1][column] == 0) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row + 1][column] = -6;
                if (!checkmate(true, mboard))
                    board_on[row + 1][column] = 2;
            }
            if (board[row + 2][column] == 0) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row + 2][column] = -6;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row + 2][column] = 2;
            }
        } else if (row != 6)
            if (row + 1 < 8)
                if (board[row + 1][column] == 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column] = -6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column] = 2;
                }
        if (row + 1 < 8)
            if (column - 1 >= 0)
                if (board[row + 1][column - 1] > 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column - 1] = -6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column - 1] = 2;
                }

        if (row + 1 < 8)
            if (column + 1 < 8)
                if (board[row + 1][column + 1] > 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column + 1] = -6;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column + 1] = 2;
                }
    }

    // Rook_white = 1  
    if (chess_piece_code == 1) {
        board_on[row][column] = 1;

        let temp_row = row;
        let temp_col = column;
        let mboard = array_copy(board);
        while (row - 1 >= 0) {
            if (board[row - 1][column] <= 0) {
                mboard[row][column] = 0;
                row--;
                mboard[row][column] = 1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8) {
            if (board[row + 1][column] <= 0) {
                mboard[row][column] = 0;
                row++;
                mboard[row][column] = 1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (column - 1 >= 0) {
            if (board[row][column - 1] <= 0) {
                mboard[row][column] = 0;
                column--;
                mboard[row][column] = 1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (column + 1 < 8) {
            if (board[row][column + 1] <= 0) {
                mboard[row][column] = 0;
                column++;
                mboard[row][column] = 1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] < 0)
                    break;
            } else
                break;
        }
        row = temp_row
        column = temp_col;
    }

    // Rook_black = -1
    if (chess_piece_code == -1) {
        board_on[row][column] = 1;
        let temp_row = row;
        let temp_col = column
        let mboard = array_copy(board);
        while (row - 1 >= 0) {
            if (board[row][column] >= 0) {
                mboard[row][column] = 0;
                row--;
                mboard[row][column] = -1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8) {
            if (board[row + 1][column] >= 0) {
                mboard[row][column] = 0;
                row++;
                mboard[row][column] = -1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (column - 1 >= 0) {
            if (board[row][column - 1] >= 0) {
                mboard[row][column] = 0;
                column--;
                mboard[row][column] = -1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row
        column = temp_col;
        mboard = array_copy(board);
        while (column + 1 < 8) {
            if (board[row][column + 1] >= 0) {
                mboard[row][column] = 0;
                column++;
                mboard[row][column] = -1;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2
                if (board[row][column] > 0)
                    break;
            } else
                break;
        }
        row = temp_row
        column = temp_col;
    }

    // Knight_white = 2
    if (chess_piece_code == 2) {
        board_on[row][column] = 1;
        if (row - 2 >= 0) {
            if (column - 1 >= 0) {
                if (board[row - 2][column - 1] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 2][column - 1] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 2][column - 1] = 2;
                }

            }
            if (column + 1 < 8) {
                if (board[row - 2][column + 1] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 2][column + 1] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 2][column + 1] = 2;

                }

            }
        }

        if (row + 2 < 8) {
            if (column - 1 >= 0) {
                if (board[row + 2][column - 1] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 2][column - 1] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 2][column - 1] = 2;

                }

            }
            if (column + 1 < 8) {
                if (board[row + 2][column + 1] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 2][column + 1] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 2][column + 1] = 2;

                }

            }
        }

        if (column - 2 >= 0) {
            if (row + 1 < 8) {
                if (board[row + 1][column - 2] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column - 2] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column - 2] = 2;

                }

            }
            if (row - 1 >= 0) {
                if (board[row - 1][column - 2] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column - 2] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column - 2] = 2;

                }

            }
        }

        if (column + 2 >= 0) {
            if (row + 1 < 8) {
                if (board[row + 1][column + 2] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column + 2] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column + 2] = 2;

                }

            }
            if (row - 1 >= 0) {
                if (board[row - 1][column + 2] <= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column + 2] = 2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column + 2] = 2;

                }

            }
        }

    }

    // Knight_black = -2
    if (chess_piece_code == -2) {
        board_on[row][column] = 1;
        if (row - 2 >= 0) {
            if (column - 1 >= 0) {
                if (board[row - 2][column - 1] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 2][column - 1] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 2][column - 1] = 2;

                }

            }
            if (column + 1 < 8) {
                if (board[row - 2][column + 1] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 2][column + 1] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 2][column + 1] = 2;

                }

            }
        }

        if (row + 2 < 8) {
            if (column - 1 >= 0) {
                if (board[row + 2][column - 1] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 2][column - 1] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 2][column - 1] = 2;

                }

            }
            if (column + 1 < 8) {
                if (board[row + 2][column + 1] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 2][column + 1] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 2][column + 1] = 2;

                }

            }
        }

        if (column - 2 >= 0) {
            if (row + 1 < 8) {
                if (board[row + 1][column - 2] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column - 2] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column - 2] = 2;


                }

            }
            if (row - 1 >= 0) {
                if (board[row - 1][column - 2] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column - 2] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column - 2] = 2;

                }

            }
        }

        if (column + 2 >= 0) {
            if (row + 1 < 8) {
                if (board[row + 1][column + 2] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column + 2] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row + 1][column + 2] = 2;

                }

            }
            if (row - 1 >= 0) {
                if (board[row - 1][column + 2] >= 0) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column + 2] = -2;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        board_on[row - 1][column + 2] = 2;

                }

            }
        }
    }

    // Bishop_white = 3
    if (chess_piece_code == 3) {
        board_on[row][column] = 1;
        let temp_row = row;
        let temp_col = column;
        let mboard = array_copy(board);
        while (row - 1 >= 0 && column - 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column--;
            if (board[row][column] <= 0) {
                mboard[row][column] = 3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;

        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0 && column + 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column++;
            if (board[row][column] <= 0) {
                mboard[row][column] = 3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column - 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column--;
            if (board[row][column] <= 0) {
                mboard[row][column] = 3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column + 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column++;
            if (board[row][column] <= 0) {
                mboard[row][column] = 3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }
        row = temp_row
        column = temp_col;

    }

    // Bishop_black = -3
    if (chess_piece_code == -3) {
        board_on[row][column] = 1;
        let temp_row = row;
        let temp_col = column;
        let mboard = array_copy(board);
        while (row - 1 >= 0 && column - 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column--;
            if (board[row][column] >= 0) {
                mboard[row][column] = -3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0 && column + 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column++;
            if (board[row][column] >= 0) {
                mboard[row][column] = -3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column - 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column--;
            if (board[row][column] >= 0) {
                mboard[row][column] = -3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column + 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column++;
            if (board[row][column] >= 0) {
                mboard[row][column] = -3;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }
        row = temp_row;
        column = temp_col;
    }

    // Queen_white = 4
    if (chess_piece_code == 4) {
        board_on[row][column] = 1;

        let temp_row = row;
        let temp_col = column;
        let mboard = array_copy(board);
        while (row - 1 >= 0 && column - 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column--;
            if (board[row][column] <= 0) {
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;

        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0 && column + 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column++;
            if (board[row][column] <= 0) {
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column - 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column--;
            if (board[row][column] <= 0) {
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column + 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column++;
            if (board[row][column] <= 0) {
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }



        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0) {
            if (board[row - 1][column] <= 0) {
                mboard[row][column] = 0;
                row--;
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8) {
            if (board[row + 1][column] <= 0) {
                mboard[row][column] = 0;
                row++;
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (column - 1 >= 0) {
            if (board[row][column - 1] <= 0) {
                mboard[row][column] = 0;
                column--;
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] < 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (column + 1 < 8) {
            if (board[row][column + 1] <= 0) {
                mboard[row][column] = 0;
                column++;
                mboard[row][column] = 4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] < 0)
                    break;
            } else
                break;
        }
        row = temp_row;
        column = temp_col;
    }

    // Queen_black = -4
    if (chess_piece_code == -4) {
        board_on[row][column] = 1;

        let temp_row = row;
        let temp_col = column;
        let mboard = array_copy(board);
        while (row - 1 >= 0 && column - 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column--;
            if (board[row][column] >= 0) {
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;

        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0 && column + 1 >= 0) {
            mboard[row][column] = 0;
            row--;
            column++;
            if (board[row][column] >= 0) {
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column - 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column--;
            if (board[row][column] >= 0) {
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8 && column + 1 < 8) {
            mboard[row][column] = 0;
            row++;
            column++;
            if (board[row][column] >= 0) {
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2;

                if (board[row][column] != 0)
                    break;
            } else
                break;
        }



        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row - 1 >= 0) {
            if (board[row - 1][column] >= 0) {
                mboard[row][column] = 0;
                row--;
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (row + 1 < 8) {
            if (board[row + 1][column] >= 0) {
                mboard[row][column] = 0;
                row++;
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (column - 1 >= 0) {
            if (board[row][column - 1] >= 0) {
                mboard[row][column] = 0;
                column--;
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] > 0)
                    break;
            } else
                break;
        }

        row = temp_row;
        column = temp_col;
        mboard = array_copy(board);
        while (column + 1 < 8) {
            if (board[row][column + 1] >= 0) {
                mboard[row][column] = 0;
                column++;
                mboard[row][column] = -4;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    board_on[row][column] = 2

                if (board[row][column] > 0)
                    break;
            } else
                break;
        }
        row = temp_row;
        column = temp_col;
    }

    //King_white = 5
    if (chess_piece_code == 5) {
        board_on[row][column] = 1;

        if (row - 1 >= 0) {
            if (board[row - 1][column] <= 0 && board[row - 1][column] != -5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row - 1][column] = 5;
                if (!checkmate(true, mboard) || !is_player_throten_side()) {
                    if (is_available(row - 1, column, 5)) {
                        board_on[row - 1][column] = 2;
                    }
                }


            }
            if (column - 1 >= 0)
                if (board[row - 1][column - 1] <= 0 && board[row - 1][column - 1] != -5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column - 1] = 5;
                    if (!checkmate(true, mboard) || !is_player_throten_side()) {
                        if (is_available(row - 1, column - 1, 5))
                            board_on[row - 1][column - 1] = 2;
                    }


                }

            if (column + 1 < 8)
                if (board[row - 1][column + 1] <= 0 && board[row - 1][column + 1] != -5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column + 1] = 5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row - 1, column + 1, 5))
                            board_on[row - 1][column + 1] = 2;

                }

        }

        if (row + 1 < 8) {
            if (board[row + 1][column] <= 0 && board[row + 1][column] != -5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row + 1][column] = 5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row + 1, column, 5))
                        board_on[row + 1][column] = 2;

            }

            if (column - 1 >= 0)
                if (board[row + 1][column - 1] <= 0 && board[row + 1][column - 1] != -5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column - 1] = 5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row + 1, column - 1, 5))
                            board_on[row + 1][column - 1] = 2;

                }

            if (column + 1 < 8)
                if (board[row + 1][column + 1] <= 0 && board[row + 1][column + 1] != -5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column + 1] = 5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row + 1, column + 1, 5))
                            board_on[row + 1][column + 1] = 2;

                }

        }

        if (column - 1 >= 0)
            if (board[row][column - 1] <= 0 && board[row][column - 1] != -5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row][column - 1] = 5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row, column - 1, 5))
                        board_on[row][column - 1] = 2;

            }


        if (column + 1 < 8)
            if (board[row][column + 1] <= 0 && board[row][column + 1] != -5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row][column + 1] = 5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row, column + 1, 5))
                        board_on[row][column + 1] = 2;

            }


    }

    // King_black = -5
    if (chess_piece_code == -5) {
        board_on[row][column] = 1;


        if (row - 1 >= 0) {
            if (board[row - 1][column] >= 0 && board[row - 1][column] != 5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row - 1][column] = -5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row - 1, column, -5))
                        board_on[row - 1][column] = 2;

            }

            if (column - 1 >= 0)
                if (board[row - 1][column - 1] >= 0 && board[row - 1][column - 1] != 5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column - 1] = -5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row - 1, column - 1, -5))
                            board_on[row - 1][column - 1] = 2;

                }

            if (column + 1 < 8)
                if (board[row - 1][column + 1] >= 0 && board[row - 1][column + 1] != 5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row - 1][column + 1] = -5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row - 1, column + 1, -5))
                            board_on[row - 1][column + 1] = 2;

                }

        }

        if (row + 1 < 8) {
            if (board[row + 1][column] >= 0 && board[row + 1][column] != 5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row + 1][column] = -5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row + 1, column, -5))
                        board_on[row + 1][column] = 2;

            }

            if (column - 1 >= 0)
                if (board[row + 1][column - 1] >= 0 && board[row + 1][column - 1] != 5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column - 1] = -5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row + 1, column - 1, -5))
                            board_on[row + 1][column - 1] = 2;

                }

            if (column + 1 < 8)
                if (board[row + 1][column + 1] >= 0 && board[row + 1][column + 1] != 5) {
                    let mboard = array_copy(board);
                    mboard[row][column] = 0;
                    mboard[row + 1][column + 1] = -5;
                    if (!checkmate(true, mboard) || !is_player_throten_side())
                        if (is_available(row + 1, column + 1, -5))
                            board_on[row + 1][column + 1] = 2;

                }

        }

        if (column - 1 >= 0)
            if (board[row][column - 1] >= 0 && board[row][column - 1] != 5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row][column - 1] = -5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row, column - 1, -5))
                        board_on[row][column - 1] = 2;

            }


        if (column + 1 < 8)
            if (board[row][column + 1] >= 0 && board[row][column + 1] != 5) {
                let mboard = array_copy(board);
                mboard[row][column] = 0;
                mboard[row][column + 1] = -5;
                if (!checkmate(true, mboard) || !is_player_throten_side())
                    if (is_available(row, column + 1, -5))
                        board_on[row][column + 1] = 2;

            }


    }

}

function is_available(row, col, king_code) {
    if (king_code == 5) {
        if (row - 1 >= 0)
            if (board[row - 1][col] == -5)
                return false
        if (row + 1 < 8)
            if (board[row + 1][col] == -5)
                return false
        if (col - 1 >= 0)
            if (board[row][col - 1] == -5)
                return false
        if (col + 1 < 8)
            if (board[row][col + 1] == -5)
                return false

        if (row - 1 >= 0 && col - 1 >= 0)
            if (board[row - 1][col - 1] == -5)
                return false;
        if (row - 1 >= 0 && col + 1 < 8)
            if (board[row - 1][col + 1] == -5)
                return false;
        if (row + 1 < 8 && col - 1 >= 0)
            if (board[row + 1][col - 1] == -5)
                return false;
        if (row + 1 < 8 && col + 1 < 8)
            if (board[row + 1][col + 1] == -5)
                return false;

    }

    if (king_code == -5) {
        if (row - 1 >= 0)
            if (board[row - 1][col] == 5)
                return false
        if (row + 1 < 8)
            if (board[row + 1][col] == 5)
                return false
        if (col - 1 >= 0)
            if (board[row][col - 1] == 5)
                return false
        if (col + 1 < 8)
            if (board[row][col + 1] == 5)
                return false

        if (row - 1 >= 0 && col - 1 >= 0)
            if (board[row - 1][col - 1] == 5)
                return false;
        if (row - 1 >= 0 && col + 1 < 8)
            if (board[row - 1][col + 1] == 5)
                return false;
        if (row + 1 < 8 && col - 1 > 0)
            if (board[row + 1][col - 1] == 5)
                return false;
        if (row + 1 < 8 && col + 1 < 8)
            if (board[row + 1][col + 1] == 5)
                return false;
    }

    return true;

}

function get_chess_piece_html_code(row, column) {
    let mohre = board[row][column]
    switch (mohre) {
        case 1: return Rook_white;
        case -1: return Rook_black;

        case 2: return Knight_white;
        case -2: return Knight_black;

        case 3: return Bishop_white;
        case -3: return Bishop_black;

        case 4: return Queen_white;
        case -4: return Queen_black;

        case 5: return King_white;
        case -5: return King_black;

        case 6: return Pawn_white;
        case -6: return Pawn_black;

        default: return '';
    }
}

function get_chess_piece_code(chess_piece_html_code) {
    switch (chess_piece_html_code) {
        case '&#9820;': return -1;
        case '&#9822;': return -2;

        case '&#9821;': return -3;
        case '&#9819;': return -4;

        case '&#9818;': return -5;
        case '&#9823;': return -6;



        case '&#9814;': return 1;
        case '&#9816;': return 2;

        case '&#9815;': return 3;
        case '&#9813;': return 4;

        case '&#9812;': return 5;
        case '&#9817;': return 6;
    }
}

function show_board() {

    if (!player_order) {
        board_dom_elem_1.classList.add('mute')
    } else
        board_dom_elem_2.classList.add('mute');

    for (let i = 0; i < 2; i++) {
        player_order = !player_order;
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                let id = undefined;
                if (player_order)
                    id = 'id1_' + row + "_" + column;
                else
                    id = 'id2_' + (7 - row) + "_" + (7 - column);
                let square = document.getElementById(id)
                switch (board[row][column]) {
                    case -1: square.innerHTML = Rook_black; break;
                    case 1: square.innerHTML = Rook_white; break;

                    case -2: square.innerHTML = Knight_black; break;
                    case 2: square.innerHTML = Knight_white; break;

                    case -3: square.innerHTML = Bishop_black; break;
                    case 3: square.innerHTML = Bishop_white; break;

                    case -4: square.innerHTML = Queen_black; break;
                    case 4: square.innerHTML = Queen_white; break;

                    case -5: square.innerHTML = King_black; break;
                    case 5: square.innerHTML = King_white; break;

                    case -6: square.innerHTML = Pawn_black; break;
                    case 6: square.innerHTML = Pawn_white; break;

                    default: square.innerHTML = ''; break;
                }

                if (board_on[row][column] == 1 || board_on[row][column] == 2) {
                    let square = document.getElementById(id);
                    square.innerHTML = '';
                    let new_div_el = document.createElement('div');
                    new_div_el.classList.add('square_selected', id)
                    new_div_el.innerHTML = get_chess_piece_html_code(row, column);
                    square.appendChild(new_div_el);
                }

                if (board_threat[row][column] == 3) {
                    let square = document.getElementById(id);
                    square.classList.add('threaten', id)
                }
            }
        }
    }

    final_game_situation = get_game_situation()
    if (final_game_situation == 1) {
        board_dom_elem_1.classList.add('mute');
        board_dom_elem_2.classList.add('mute');
        player_order_doc_elem.innerHTML = 'White Player Won';
    } else if (final_game_situation == -1) {
        board_dom_elem_1.classList.add('mute');
        board_dom_elem_2.classList.add('mute');
        player_order_doc_elem.innerHTML = 'Black player Won!';
    } else if (final_game_situation == 2) {
        board_dom_elem_1.classList.add('mute');
        board_dom_elem_2.classList.add('mute');
        player_order_doc_elem.innerHTML = 'Equal!';
    }

}

function checkmate2() {

    if (!checkmate(true, board)) {

        for (let row in board_on) {
            for (let column in board_on) {
                if (board_threat[row][column] == 3 || board_threat[row][column] == 1) {
                    let id1 = 'id1_' + row + '_' + column;
                    let id2 = 'id2_' + (7 - row) + '_' + (7 - column);

                    let square1 = document.getElementById(id1);
                    square1.classList.remove('threaten');

                    let square2 = document.getElementById(id2);
                    square2.classList.remove('threaten');

                    board_threat[row][column] = 0;
                }
            }
        }

    }

}


function checkmate(is_test, mmmboard) {

    let king_black_row;
    let king_black_column;
    let king_white_row;
    let king_white_column;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (mmmboard[row][column] == -5) {
                king_black_row = row;
                king_black_column = column;
            }
            if (mmmboard[row][column] == 5) {
                king_white_row = row;
                king_white_column = column;
            }
        }
    }


    // ##########################################
    // ################## Pawn ##################
    // ##########################################
    // Pawn_white_code = 6 threat?
    if (king_black_row + 1 < 8) {
        if (king_black_column + 1 < 8) {
            if (mmmboard[king_black_row + 1][king_black_column + 1] == 6) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(`king_black is threaten by Pawn_white with position (${king_black_row + 1}, ${king_black_column + 1})`)

                board_threat[king_black_row + 1][king_black_column + 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;


            }
        }
        if (king_black_column - 1 >= 0) {
            if (mmmboard[king_black_row + 1][king_black_column - 1] == 6) {
                threaten_side = -1
                if (is_test)
                    return true;

                console.log(`king_black is threaten by Pawn_white with position (${king_black_row + 1}, ${king_black_column - 1})`)

                board_threat[king_black_row + 1][king_black_column - 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;


            }
        }
    }

    // Pawn_balck_code = -6 threat?
    if (king_white_row - 1 < 8) {
        if (king_white_column + 1 < 8) {
            if (mmmboard[king_white_row - 1][king_white_column + 1] == -6) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(`king_white is threaten by Pawn_black with position (${king_white_row - 1}, ${king_white_column + 1})`)

                board_threat[king_white_row - 1][king_white_column + 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;


            }
        }
        if (king_white_column - 1 >= 0) {
            if (mmmboard[king_white_row - 1][king_white_column - 1] == -6) {
                threaten_side = 1
                if (is_test)
                    return true;

                console.log(`king_white is threaten by Pawn_black with position (${king_white_row - 1}, ${king_white_column - 1})`)

                board_threat[king_white_row - 1][king_white_column - 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;


            }
        }
    }
    // ##########################################




    // ##########################################
    // ################## Rook ##################
    // ##########################################
    // Rook_white_code = 1 threat?
    temp_row = king_black_row;
    temp_col = king_black_column;
    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (mmmboard[king_black_row][king_black_column] != 1 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 1) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;

    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (mmmboard[king_black_row][king_black_column] != 1 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 1) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_column + 1 < 8) {
        king_black_column++;
        if (mmmboard[king_black_row][king_black_column] != 1 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 1) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_column - 1 >= 0) {
        king_black_column--;
        if (mmmboard[king_black_row][king_black_column] != 1 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 1) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    // Rook_black_code = -1 threat?
    temp_row = king_white_row;
    temp_col = king_white_column;
    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (mmmboard[king_white_row][king_white_column] != -1 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -1) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;

    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (mmmboard[king_white_row][king_white_column] != -1 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -1) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_column + 1 < 8) {
        king_white_column++;
        if (mmmboard[king_white_row][king_white_column] != -1 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -1) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_column - 1 >= 0) {
        king_white_column--;
        if (mmmboard[king_white_row][king_white_column] != -1 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -1) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;
    // ##########################################




    // ##########################################
    // ################# Knight #################
    // ##########################################
    // Knight_white_code = 2 threat?
    if (king_black_row + 1 < 8) {
        if (king_black_column + 2 < 8) {
            if (mmmboard[king_black_row + 1][king_black_column + 2] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row + 1}, ${king_black_column + 2})`));
                board_threat[king_black_row + 1][king_black_column + 2] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
        if (king_black_column - 2 >= 0) {
            if (mmmboard[king_black_row + 1][king_black_column - 2] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row + 1}, ${king_black_column - 2})`));
                board_threat[king_black_row + 1][king_black_column - 2] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
    }
    if (king_black_row - 1 >= 0) {
        if (king_black_column + 2 < 8) {
            if (mmmboard[king_black_row - 1][king_black_column + 2] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row - 1}, ${king_black_column + 2})`));
                board_threat[king_black_row - 1][king_black_column + 2] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
        if (king_black_column - 2 >= 0) {
            if (mmmboard[king_black_row - 1][king_black_column - 2] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row - 1}, ${king_black_column - 2})`));
                board_threat[king_black_row - 1][king_black_column - 2] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
    }
    if (king_black_row - 2 >= 0) {
        if (king_black_column + 1 < 8) {
            if (mmmboard[king_black_row - 2][king_black_column + 1] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row - 2}, ${king_black_column + 1})`));
                board_threat[king_black_row - 2][king_black_column + 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
        if (king_black_column - 1 < 8) {
            if (mmmboard[king_black_row - 2][king_black_column - 1] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row - 2}, ${king_black_column - 1})`));
                board_threat[king_black_row - 2][king_black_column - 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
    }
    if (king_black_row + 2 < 8) {
        if (king_black_column + 1 < 8) {
            if (mmmboard[king_black_row + 2][king_black_column + 1] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row + 2}, ${king_black_column + 1})`));
                board_threat[king_black_row + 2][king_black_column + 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
        if (king_black_column - 1 < 8) {
            if (mmmboard[king_black_row + 2][king_black_column - 1] == 2) {
                threaten_side = -1
                if (is_test)
                    return true;
                console.log(console.log(`king_black is threaten by Knight_white with position (${king_black_row + 2}, ${king_black_column - 1})`));
                board_threat[king_black_row + 2][king_black_column - 1] = 3;
                board_threat[king_black_row][king_black_column] = 3;
            }
        }
    }

    // Knight_black_code = -2 threat?
    if (king_white_row + 1 < 8) {
        if (king_white_column + 2 < 8) {
            if (mmmboard[king_white_row + 1][king_white_column + 2] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row + 1}, ${king_white_column + 2})`));
                board_threat[king_white_row + 1][king_white_column + 2] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
        if (king_white_column - 2 >= 0) {
            if (mmmboard[king_white_row + 1][king_white_column - 2] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row + 1}, ${king_white_column - 2})`));
                board_threat[king_white_row + 1][king_white_column - 2] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
    }
    if (king_white_row - 1 >= 0) {
        if (king_white_column + 2 < 8) {
            if (mmmboard[king_white_row - 1][king_white_column + 2] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row - 1}, ${king_white_column + 2})`));
                board_threat[king_white_row - 1][king_white_column + 2] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
        if (king_white_column - 2 >= 0) {
            if (mmmboard[king_white_row - 1][king_white_column - 2] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row - 1}, ${king_white_column - 2})`));
                board_threat[king_white_row - 1][king_white_column - 2] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
    }
    if (king_white_row - 2 >= 0) {
        if (king_white_column + 1 < 8) {
            if (mmmboard[king_white_row - 2][king_white_column + 1] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row - 2}, ${king_white_column + 1})`));
                board_threat[king_white_row - 2][king_white_column + 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
        if (king_white_column - 1 < 8) {
            if (mmmboard[king_white_row - 2][king_white_column - 1] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row - 2}, ${king_white_column - 1})`));
                board_threat[king_white_row - 2][king_white_column - 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
    }
    if (king_white_row + 2 < 8) {
        if (king_white_column + 1 < 8) {
            if (mmmboard[king_white_row + 2][king_white_column + 1] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row + 2}, ${king_white_column + 1})`));
                board_threat[king_white_row + 2][king_white_column + 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
        if (king_white_column - 1 < 8) {
            if (mmmboard[king_white_row + 2][king_white_column - 1] == -2) {
                threaten_side = 1
                if (is_test)
                    return true;
                console.log(console.log(`king_white is threaten by Knight_white with position (${king_white_row + 2}, ${king_white_column - 1})`));
                board_threat[king_white_row + 2][king_white_column - 1] = 3;
                board_threat[king_white_row][king_white_column] = 3;
            }
        }
    }
    // ##########################################



    // ##########################################
    // ################# Bishop #################
    // ##########################################
    // Bishop_white_code = 3 threat?
    temp_row = king_black_row;
    temp_col = king_black_column;
    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (king_black_column + 1 < 8) {
            king_black_column++;
            if (mmmboard[king_black_row][king_black_column] != 3 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 3) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;

    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (king_black_column - 1 >= 0) {
            king_black_column--;
            if (mmmboard[king_black_row][king_black_column] != 3 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 3) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (king_black_column + 1 < 8) {
            king_black_column++;
            if (mmmboard[king_black_row][king_black_column] != 3 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 3) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (king_black_column - 1 >= 0) {
            king_black_column--;
            if (mmmboard[king_black_row][king_black_column] != 3 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 3) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    // Bishop_black_code = -3
    temp_row = king_white_row;
    temp_col = king_white_column;
    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (king_white_column + 1 < 8) {
            king_white_column++;
            if (mmmboard[king_white_row][king_white_column] != -3 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -3) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;

    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (king_white_column - 1 >= 0) {
            king_white_column--;
            if (mmmboard[king_white_row][king_white_column] != -3 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -3) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (king_white_column + 1 < 8) {
            king_white_column++;
            if (mmmboard[king_white_row][king_white_column] != -3 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -3) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (king_white_column - 1 >= 0) {
            king_white_column--;
            if (mmmboard[king_white_row][king_white_column] != -3 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -3) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;
    // ##########################################









    // ##########################################
    // ################# Queen ##################
    // ##########################################
    // Queen_white_code = 4 threat?
    // rook white like
    temp_row = king_black_row;
    temp_col = king_black_column;
    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 4) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;

    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 4) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_column + 1 < 8) {
        king_black_column++;
        if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 4) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_column - 1 >= 0) {
        king_black_column--;
        if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
            break;
        if (mmmboard[king_black_row][king_black_column] == 4) {
            threaten_side = -1;
            if (is_test)
                return true;
            board_threat[king_black_row][king_black_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_black_row = temp_row;
    king_black_column = temp_col;

    // bishop white like
    temp_row = king_black_row;
    temp_col = king_black_column;
    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (king_black_column + 1 < 8) {
            king_black_column++;
            if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 4) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;

    while (king_black_row + 1 < 8) {
        king_black_row++;
        if (king_black_column - 1 >= 0) {
            king_black_column--;
            if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 4) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (king_black_column + 1 < 8) {
            king_black_column++;
            if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 4) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    while (king_black_row - 1 >= 0) {
        king_black_row--;
        if (king_black_column - 1 >= 0) {
            king_black_column--;
            if (mmmboard[king_black_row][king_black_column] != 4 && mmmboard[king_black_row][king_black_column] != 0)
                break;
            if (mmmboard[king_black_row][king_black_column] == 4) {
                threaten_side = -1
                if (is_test)
                    return true;
                board_threat[king_black_row][king_black_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_black_row = temp_row;
    king_black_column = temp_col;


    // Queen_black_code = 4 threat?
    // rook black like
    temp_row = king_white_row;
    temp_col = king_white_column;
    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -4) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;

    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -4) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_column + 1 < 8) {
        king_white_column++;
        if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -4) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_column - 1 >= 0) {
        king_white_column--;
        if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
            break;
        if (mmmboard[king_white_row][king_white_column] == -4) {
            threaten_side = 1;
            if (is_test)
                return true;
            board_threat[king_white_row][king_white_column] = 3;
            board_threat[temp_row][temp_col] = 3;
        }

    }
    king_white_row = temp_row;
    king_white_column = temp_col;

    // bishop black like
    temp_row = king_white_row;
    temp_col = king_white_column;
    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (king_white_column + 1 < 8) {
            king_white_column++;
            if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -4) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;

    while (king_white_row + 1 < 8) {
        king_white_row++;
        if (king_white_column - 1 >= 0) {
            king_white_column--;
            if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -4) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (king_white_column + 1 < 8) {
            king_white_column++;
            if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -4) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;


    while (king_white_row - 1 >= 0) {
        king_white_row--;
        if (king_white_column - 1 >= 0) {
            king_white_column--;
            if (mmmboard[king_white_row][king_white_column] != -4 && mmmboard[king_white_row][king_white_column] != 0)
                break;
            if (mmmboard[king_white_row][king_white_column] == -4) {
                threaten_side = 1
                if (is_test)
                    return true;
                board_threat[king_white_row][king_white_column] = 3;
                board_threat[temp_row][temp_col] = 3;
            }

        }
    }
    king_white_row = temp_row;
    king_white_column = temp_col;





    return false;

}

function is_player_throten_side() {

    if (threaten_side == -1) {
        if (player_order) {
            return false;
        } else {
            return true;
        }
    }

    if (threaten_side == 1) {
        if (!player_order) {
            return false;
        } else {
            return true;
        }
    }

    return NaN;
}


function move(row1, column1, row2, column2) {

    let back_up_board = array_copy(board);

    if (board_on[row2][column2] == 2) {
        board[row2][column2] = board[row1][column1];
        board[row1][column1] = 0;

        if (!player_order) {
            board_dom_elem_1.classList.remove('mute');
            player_order_doc_elem.innerHTML = 'White Player';
        }
        else {
            board_dom_elem_2.classList.remove('mute');
            player_order_doc_elem.innerHTML = 'Black Player';
        }


        checkmate(false, board);
        checkmate2()

        if (checkmate(true, board)) {
            if (is_player_throten_side()) {
                board = back_up_board;
                console.log('Illigal movement! you are still is checkmate situation');
                alert('Illigal movement! you are still is checkmate situation');
            }
            else {
                player_order = !player_order;
            }
        } else {
            player_order = !player_order;
        }


    }

}

function get_game_situation() {

    board_on_copy = array_copy(board_on);

    let game_situation = 0 // 0 -> continue & 1 -> White won & -1 -> Black won & 2 -> equal

    if (pot_condition_counter >= pot_condition_count) { // در صورتی که فقط یکی از شاه ها باقی مانده باشد و بیش از 50 حرکت انجام شده باشد آنگاه نتیجه مسابقه پات هست 
        game_situation = 2;
        return game_situation;
    }

    // اگر فقط شاه در برابر شاه باقی مانده باشد آنگاه نتیجه پات خواهد بود
    let arr = [] // کل مهره های باقی مانده 
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] != 5 && board[row][col] != -5 && board[row][col] != 0) {
                arr[(row) * 8 + col] = board[row][col];
            }
        }
    }
    if (arr.length == 2) {
        game_situation = 2;
        return game_situation;
    }


    // آیا یکی از شاه ها تنها مانده؟
    let white_nums = 0
    let black_nums = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0)
            white_nums++;
        if (arr[i] < 0)
            black_nums++;
    }


    if (player_order) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board[row][col] > 0) {
                    possible_movements(row, col);
                }
            }
        }
        if (!is_there_possible_movements(board_on) && is_there_possible_movements(board_threat)) { // اگر کیش وجود دارد و هیچ حرکتی برای بازیکن سفید نمانده آنگاه بازیکن سیاه می برد
            game_situation = -1;
        }
        else if (!is_there_possible_movements(board_on) && !is_there_possible_movements(board_threat)) { // اگر کیش وجود ندارد ولی بازیکن هیچ حرکتی قانونی ندارد آنگاه بازی پات می شود
            game_situation = 2;
        } else if ((is_there_possible_movements(board_on) && !is_there_possible_movements(board_threat)) || (is_there_possible_movements(board_on) && is_there_possible_movements(board_threat))) { // اگر کیش وجود دارد یا ندارد و نیز حرکتی برای بازیکن سفید هست آنگاه بازی ادامه دارد 
            game_situation = 0;
            if (white_nums <= 1)
                pot_condition_counter++;
        } else {
            console.log("There is an Error!")
        }
        board_on = board_on_copy;
    } else {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board[row][col] < 0) {
                    possible_movements(row, col);
                }
            }
        }
        if (!is_there_possible_movements(board_on) && is_there_possible_movements(board_threat)) {
            game_situation = 1;
        }
        else if (!is_there_possible_movements(board_on) && !is_there_possible_movements(board_threat)) {
            game_situation = 2;
        } else if (is_there_possible_movements(board_on) && !is_there_possible_movements(board_threat) || is_there_possible_movements(board_on) && is_there_possible_movements(board_threat)) {
            game_situation = 0;
            if (black_nums <= 1)
                pot_condition_counter++;
        } else {
            console.log("There is an Error!")
        }
        board_on = board_on_copy;
    }


    return game_situation;

}

function is_there_possible_movements(board) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] > 1)
                return true;
        }
    }
    return false;
}


function is_clicked() {
    for (let x of board_on)
        for (let y of x)
            if (y > 0 && y != 3)
                return true;
    return false;
}

// let click_count = 0;
let board_dom_elem_1 = document.getElementById('board_1');
let board_dom_elem_2 = document.getElementById('board_2');

let row1;
let column1;
let row2;
let column2;

function board_clicked_events(e) {

    if (!is_clicked()) {

        let id = e.target.id;
        row1 = parseInt(id.split('_')[1]);
        column1 = parseInt(id.split('_')[2]);
        if (player_order) {
            if (board[row1][column1] > 0)
                possible_movements(row1, column1);
        } else {
            if (board[7 - row1][7 - column1] < 0)
                possible_movements(7 - row1, 7 - column1);
        }

    } else {
        try {
            let id = e.target.classList[1];
            row2 = parseInt(id.split('_')[1]);
            column2 = parseInt(id.split('_')[2]);

            if (player_order) {

                if (board[row1][column1] > 0) {
                    move(row1, column1, row2, column2);
                }
            }
            else {
                if (board[7 - row1][7 - column1] < 0)
                    move(7 - row1, 7 - column1, 7 - row2, 7 - column2);
            }

            board_off_all();

            row1 = undefined;
            column1 = undefined;
            row2 = undefined;
            column2 = undefined;
        } catch (e) {
            console.log('Please select true!')
        }

    }

    show_board()
    //show_board()

}


board_dom_elem_1.addEventListener('click', (e) => {
    if (player_order && final_game_situation == 0) {
        board_clicked_events(e);
    }
});

board_dom_elem_2.addEventListener('click', (e) => {
    if (!player_order && final_game_situation == 0) {
        board_clicked_events(e)
    }
});

show_board()
//show_board()


function array_copy(arr) {

    let a = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            a[i][j] = arr[i][j];
        }
    }
    return a;
}


