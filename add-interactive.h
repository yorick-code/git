#ifndef ADD_INTERACTIVE_H
#define ADD_INTERACTIVE_H

#include "color.h"

struct add_i_state {
	struct repository *r;
	int use_color;
	char header_color[COLOR_MAXLEN];
	char help_color[COLOR_MAXLEN];
	char prompt_color[COLOR_MAXLEN];
	char error_color[COLOR_MAXLEN];
	char reset_color[COLOR_MAXLEN];
	char fraginfo_color[COLOR_MAXLEN];
	char context_color[COLOR_MAXLEN];
	char file_old_color[COLOR_MAXLEN];
	char file_new_color[COLOR_MAXLEN];
};

void init_add_i_state(struct add_i_state *s, struct repository *r);

enum color_add_i {
	COLOR_HEADER = 0,
	COLOR_HELP,
	COLOR_PROMPT,
	COLOR_ERROR,
	COLOR_RESET,
};
const char *get_add_i_color(enum color_add_i ix);

struct repository;
struct pathspec;
int run_add_i(struct repository *r, const struct pathspec *ps);

enum add_p_mode {
	ADD_P_STAGE,
	ADD_P_STASH,
	ADD_P_RESET,
};

int run_add_p(struct repository *r, enum add_p_mode mode,
	      const char *revision, const struct pathspec *ps);

#endif
